import { Component, OnInit } from '@angular/core';
import { SearchMovie } from './movie-search.service';
import { MovieDataService } from "../services/movie-data.service";
import { MovieDb } from '../interfaces/movie';
import { Subscription } from 'rxjs';
import { ActorDataService } from '../services/actor-data.service';
import { GetBackgoundColor } from './background-color.service';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  animations: [
    trigger('largeSmall', [
      state('large', style({
        height: '580px'
      })),
      state('small', style({
        height: '355px',
      })),
      transition('large => small', [
        animate('1.5s')
      ]),
      transition('small => large', [
        animate('1.5s')
      ]),
    ]),
  ]
})

export class MovieSearchComponent implements OnInit {
  colors:any[] = [];

  constructor(private searchMovie: SearchMovie,
              private movieData: MovieDataService,
              private actorData: ActorDataService,
              private getBackgroundColor: GetBackgoundColor) { }

  img: HTMLImageElement

  subscription: Subscription;
  movieList: MovieDb[];
  movie: MovieDb;
  imageDataHell: any;
  component: number;

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieList.subscribe(movieList => this.movieList = movieList)
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
  }

  chooseMovie(movie: MovieDb) {
    this.actorData.deletePicsUrls()
    this.movieData.changeComponent(0)
    this.movieData.changeMovieDb(movie)
    this.pixelate(movie)
    this.searchMovie.getTrailer(movie.title, movie.year)
      .subscribe((r: any) => {
        this.movieData.changeMovieTrailer(r.trailer_id)
        console.log(this.movie);
      })
  }

  
  pixelate(movie) {
    this.getBackgroundColor.getColorArray(movie)
    .subscribe(r => {console.log(r)
                     this.colors = []
                     for (var i = 0, n = r.data.length; i < n; i += 4) {
                       var rgbArray = "rgb(" + r.data[i] + "," + r.data[i + 1] + "," + r.data[i + 2] + ")"
                       this.colors.push(rgbArray)
                     }
                     var histogramMap = {};
                     for (var i = 0, len = this.colors.length; i < len; i++) {
                       var key = this.colors[i];
                       histogramMap[key] = (histogramMap[key] || 0) + 1;
                     }
                     var histogram = [];
                     for (key in histogramMap) {
                       histogram.push({ key: key, freq: histogramMap[key] });
                     }
                     histogram.sort(function (a, b) { return b.freq - a.freq })
                     this.colors = histogram;})
  }
}

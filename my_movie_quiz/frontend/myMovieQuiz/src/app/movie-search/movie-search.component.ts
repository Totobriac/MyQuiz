import { Component, OnInit } from '@angular/core';
import { SearchMovie } from './movie-search.service';
import { MovieDataService } from "../services/movie-data.service";
import { MovieDb } from '../interfaces/movie';
import { Subscription } from 'rxjs';
import { ActorDataService } from '../services/actor-data.service';
import { GetBackgoundColor } from './background-color.service';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';


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
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('200ms', [
          animate('.5s ease-in', keyframes([
            // style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            // style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            // style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
            style({ opacity: 0, transform: 'scale(0) rotate(-540deg)', offset: 0 }),
            style({ opacity: .7, transform: 'scale(0.5)', offset: 0.3 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
          ]))]), { optional: true }),
        query(':leave', stagger('200ms', [
          animate('600ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .7, transform: 'scale(.5)', offset: 0.4 }),
            style({ opacity: 0, transform: 'scale(0) rotate(720deg)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),
  ]
})

export class MovieSearchComponent implements OnInit {
  colors: any[] = [];

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
  showTools: boolean;

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieList.subscribe(movieList => this.movieList = movieList)
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
    this.subscription = this.movieData.currentShowTool.subscribe(showTools => this.showTools = showTools)
  }

  chooseMovie(movie: MovieDb) {
    this.actorData.deletePicsUrls()
    this.movieData.changeComponent(0)
    this.movieData.changeMovieDb(movie)
    this.movieData.changeShowTool(false)
    this.pixelate(movie)
    this.searchMovie.getTrailer(movie.title, movie.year)
      .subscribe((r: any) => {
        this.movieData.changeMovieTrailer(r.trailer_id)
        console.log(this.movie);
      })
  }


  pixelate(movie) {
    this.getBackgroundColor.getColorArray(movie)
      .subscribe(r => {
        console.log(r)
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
        this.colors = histogram;
      })
  }
}

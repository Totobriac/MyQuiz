import { Component, OnInit } from '@angular/core';
import { SearchMovie } from './movie-search.service';
import { MovieDataService } from "../services/movie-data.service";
import { MovieDb } from '../interfaces/movie';
import { Subscription } from 'rxjs';
import { ActorDataService } from '../services/actor-data.service';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})

export class MovieSearchComponent implements OnInit {

  constructor(private searchMovie: SearchMovie,
              private movieData: MovieDataService,
              private actorData: ActorDataService) { }

  subscription: Subscription;
  movieList: MovieDb[];
  movie: MovieDb;


  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieList.subscribe(movieList => this.movieList = movieList)
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)

  }

  chooseMovie(movie: MovieDb) {
    this.actorData.deletePicsUrls()
    this.movieData.changeComponent(0)
    this.movieData.changeMovieDb(movie)
    this.searchMovie.getTrailer(movie.title, movie.year)
    .subscribe((r:any) => {this.movieData.changeMovieTrailer(r.trailer_id)
                           console.log(this.movie);})
  }
}
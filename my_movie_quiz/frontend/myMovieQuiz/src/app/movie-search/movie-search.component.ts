import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SearchMovie } from './movie-search.service';
import { MovieDataService } from "../services/movie-data.service";
import { Movie, MovieDb } from '../interfaces/movie';
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

  @Output() trailer = new EventEmitter()

  trailerId: string
  videoSource: any
  isSelected: boolean = false

  subscription: Subscription;
  movieList: MovieDb[];

  actors: any

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieList.subscribe(movieList => this.movieList = movieList)
    this.subscription = this.actorData.currentActor.subscribe(actors => this.actors = actors)
  }

  chooseMovie(movie: MovieDb) {
    this.actorData.deletePicsUrls()
    console.log(this.actors);
    this.movieData.changeComponent(0)
    this.movieData.changeMovieDb(movie)  
    this.searchMovie.searchMovie(movie.id)       
    .subscribe((r: Movie) => { this.movieData.changeMovie(r)
                               console.log(r)                                                   
                               // this.trailerId = r.trailer.id
                               this.getTrailer()
                            })
  }

  getTrailer() {
    if (this.trailerId != undefined){
      this.searchMovie.getTrailer(this.trailerId)
        .subscribe(r=> { this.videoSource = r
                        this.trailer.emit(r)})
    }
  }
}
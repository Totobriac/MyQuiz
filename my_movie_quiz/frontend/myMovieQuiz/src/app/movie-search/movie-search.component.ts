import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SearchMovie } from './movie-search.service';
import { MovieDataService } from "../services/movie-data.service";
import { Movie, MovieDb } from '../interfaces/movie';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  constructor(private searchMovie: SearchMovie,
              private data: MovieDataService) { }

  model: any
  value: string
  @Output() trailer = new EventEmitter()

  trailerId: string
  videoSource: any
  isSelected: boolean = false

  subscription: Subscription;
  movieList: MovieDb[];

  ngOnInit(): void {
    this.subscription = this.data.currentMovieList.subscribe(movieList => this.movieList = movieList)
  }

  chooseMovie(movie: MovieDb) {
    this.data.changeMovieDb(movie)  
    this.searchMovie.searchMovie(movie.id)       
    .subscribe((r: Movie) => { this.data.changeMovie(r)
                               console.log(r)
                               this.data.changeComponent(0)                      
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
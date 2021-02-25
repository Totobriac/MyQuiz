import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SearchMovie } from './movie-search.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  constructor(private searchMovie: SearchMovie ) { }
  model: any
  value: string
  @Output() movie = new EventEmitter()
  @Output() trailer = new EventEmitter()
  @Output() backdrop = new EventEmitter()

  @Input() movieList: []
  trailerId: string
  videoSource: any
  isSelected: boolean = false

  ngOnInit(): void {
  }

  chooseMovie(movieId:number, movieBackdrop: string) {     
    this.searchMovie.searchMovie(movieId)       
    .subscribe((r:any) => {this.movie.emit(r)                          
                          this.trailerId = r.trailer.id
                          this.getTrailer()
                          this.backdrop.emit(movieBackdrop)})
  }

  getTrailer() {
    if (this.trailerId != undefined){
      this.searchMovie.getTrailer(this.trailerId)
        .subscribe(r=> { this.videoSource = r
                        this.trailer.emit(r)})
    }
  }  
}
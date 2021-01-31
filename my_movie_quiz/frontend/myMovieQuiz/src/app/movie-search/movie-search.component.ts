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
  @Output() questionType = new EventEmitter()
  @Output() trailer = new EventEmitter()

  @Input() movieList: []
  trailerId: string
  videoSource: any
  ngOnInit(): void {
  }

  chooseMovie(movieId:number) {
    this.searchMovie.searchMovie(movieId)       
    .subscribe((r:any) => {this.movie.emit(r)                          
                          this.trailerId = r.trailer.id
                          console.log(r)
                          this.getTrailer()})
  }

  questionEditor(page) {    
    this.questionType.emit(page)
  }

  getTrailer() {
    if (this.trailerId != undefined){
      this.searchMovie.getTrailer(this.trailerId)
        .subscribe(r=> { this.videoSource = r
                        console.log(r)
                        this.trailer.emit(r)})
    }
  }
}
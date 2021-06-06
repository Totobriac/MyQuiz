import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  subscription : Subscription
  movie: MovieDb

  constructor( private movieData: MovieDataService, ) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
  }

}

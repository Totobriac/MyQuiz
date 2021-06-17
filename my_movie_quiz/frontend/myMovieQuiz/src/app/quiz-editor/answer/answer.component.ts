import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/interfaces/answer';
import { MovieDb } from 'src/app/interfaces/movie';
import { AnswerDataService } from 'src/app/services/answer-data.service';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  subscription: Subscription;
  movie: MovieDb;
  backImg: any;
  answer: Answer;

  constructor(private movieData: MovieDataService,
              private answerData: AnswerDataService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.answerData.currentAnswerTools.subscribe(answer => this.answer = answer);
  }

  getBackImg() {
    var backImg
    this.answer.backgrounds[0] === "empty"
    ? backImg = 'https://image.tmdb.org/t/p/w780' + this.movie.backdrop
    : backImg = this.answer.background.highUrl
    return(backImg)
  }
}

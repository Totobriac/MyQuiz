import { Component, OnInit } from '@angular/core';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-quiz-curtain',
  templateUrl: './quiz-curtain.component.html',
  styleUrls: ['./quiz-curtain.component.css']
})
export class QuizCurtainComponent implements OnInit {

  backdrop: any
  subscription: Subscription

  constructor(private data: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMovieDb.subscribe(movie => this.backdrop = movie.backdrop)
  }

}

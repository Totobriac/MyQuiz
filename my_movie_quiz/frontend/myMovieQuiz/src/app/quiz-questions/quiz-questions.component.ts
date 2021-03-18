import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {

  component: number
  subscription: Subscription

  constructor(private data: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentComponent.subscribe(component => this.component = component)
  }

}

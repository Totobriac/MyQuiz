import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {

  @Input() component: number

  constructor() { }

  ngOnInit(): void {
  }

}

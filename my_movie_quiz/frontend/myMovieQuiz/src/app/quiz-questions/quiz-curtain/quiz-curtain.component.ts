import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-curtain',
  templateUrl: './quiz-curtain.component.html',
  styleUrls: ['./quiz-curtain.component.css']
})
export class QuizCurtainComponent implements OnInit {

  @Input() backdrop: string

  constructor() { }

  ngOnInit(): void {
  }

}

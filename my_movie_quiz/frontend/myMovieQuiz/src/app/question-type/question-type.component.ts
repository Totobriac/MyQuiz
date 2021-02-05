import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css']
})
export class QuestionTypeComponent implements OnInit {

  constructor() { }
  @Output() questionType = new EventEmitter()
  selectedQuestion: number = 1;

  ngOnInit(): void {
  }

  questionEditor(page) {    
    this.questionType.emit(page)
  }

}

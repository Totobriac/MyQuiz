import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.css']
})
export class QuizEditorComponent implements OnInit {

  @Input() quizedMovie;
  @Input() component: number
  @Input() trailer: string
  videoSource: any
  
  constructor() { }  

  ngOnInit(): void {    
    }
}

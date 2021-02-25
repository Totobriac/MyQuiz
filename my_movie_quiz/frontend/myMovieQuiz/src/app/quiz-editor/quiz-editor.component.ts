import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.css']
})
export class QuizEditorComponent implements OnInit {

  @Input() quizedMovie;
  @Input() component: number;
  @Input() trailer: string;
  @Input() backdrop: string;
  @Input() fontSize: number;
  @Input() changeColor: object;
  @Input() fontFamily: string;
  @Input() background: string;
  @Input() backOpacity: number;
  @Input() cornerStyle: string;
  @Input() isBold: boolean;
  @Input() borderStyle: string;
  videoSource: any
  
  constructor() { }  

  ngOnInit(): void {  
  }
}

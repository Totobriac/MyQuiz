import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.css'],
  animations: [
    trigger('enterTrigger', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s linear', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('1s linear', style({ opacity: '0' }))
      ])],
    ),
  ]
})

export class QuizEditorComponent implements OnInit {

  @Input() trailer: string;

  component: number
  subscription: Subscription

  constructor(private data: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentComponent.subscribe(component => this.component = component)
  }
}

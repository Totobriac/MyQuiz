import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css']
})
export class QuestionTypeComponent implements OnInit {

  constructor(private data: MovieDataService) {}

  ngOnInit(): void {
  }

  question(choice: number) {
    this.data.changeComponent(choice)
  }
}

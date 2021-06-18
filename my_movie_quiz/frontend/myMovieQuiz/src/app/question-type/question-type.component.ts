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
    if (choice == 4 || choice == 5) {
      this.data.changeShowTool(false);
    }
    else {
      this.data.changeShowTool(true);
    }
    this.data.changeTool(choice);
    this.data.changeComponent(choice);
  }
}

import { Component, } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myMovieQuiz';
  selectedMovieTrailer: string
  display: string

  constructor() {}  

  getMovieTrailer(trailer) {
    this.selectedMovieTrailer = trailer
  }
  
  selectedDisplay(display) {
    this.display = display
  }

}
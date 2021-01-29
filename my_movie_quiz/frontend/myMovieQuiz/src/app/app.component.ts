import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myMovieQuiz';
  quizedMovie: any;
  selectedQuestion: any = 1;
  selectedMovieTrailer: string

  selectedMovie(movie) {
    this.selectedQuestion = 1
    this.quizedMovie = movie} 

  selectQuestion(questionType) {
    this.selectedQuestion = questionType
    console.log(this.selectedQuestion)}

  getMovieTrailer(trailer) {
    this.selectedMovieTrailer = trailer
  }
}
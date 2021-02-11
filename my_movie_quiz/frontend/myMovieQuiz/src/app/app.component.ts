import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myMovieQuiz';
  quizedMovie: any;
  selectedQuestion: any = 0;
  selectedMovieTrailer: string
  selectedMovieBackdrop: string
  movieList: string[]
  selectedMovieBackdropSource: string
  fontSize: number
  fontFamily: string
  changeColor: boolean

  constructor() {}

  selectedMovies(movieList) {
    this.movieList = movieList
  }

  selectedMovie(movie) {
    this.selectedQuestion = 0
    this.quizedMovie = movie}    

  selectQuestion(questionType) {
    this.selectedQuestion = questionType
  }

  getMovieTrailer(trailer) {
    this.selectedMovieTrailer = trailer
  }

  getMovieBackdrop(backdrop) {
    this.selectedMovieBackdrop = backdrop
  }

  selectedFontSize(fontSize) {
    this.fontSize = fontSize
  }

  changeFontColor(changeColor) {
    this.changeColor = changeColor
  }

  changeFontFamily(fontFamily) {
    this.fontFamily = fontFamily
  }
}
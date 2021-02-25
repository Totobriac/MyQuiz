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
  changeColor: object
  background: string
  backOpacity: number
  cornerStyle: string
  isBold: boolean
  borderStyle: string

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

  changeBackground(background) {
    this.background = background
  }

  setBackOpacity(opacity) {
    this.backOpacity = opacity['value']
  }

  setCornerStyle(cornerStyle) {
    this.cornerStyle = cornerStyle
  }

  isTextBold(bold) {
    this.isBold = bold
  }

  whichBorder(border) {
    this.borderStyle = border
  }
}
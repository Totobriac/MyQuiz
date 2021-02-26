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
  plotFF: string
  actFF: string
  changeColor: object
  plotBack: string
  actBack: string
  backOpacity: number
  cornerStyle: string
  isBold: object
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
    if (fontFamily['question'] == 1) {
      this.plotFF = fontFamily['value']}
    else if (fontFamily['question'] == 2) {
      this.actFF = fontFamily['value']} 
  }

  changePlotBack(background) {
    this.plotBack = background
  }

  changePicBack(background) {
    if (background['question'] == 1) {
      this.plotBack = background['value']}
    else if (background['question'] == 2) {
      this.actBack = background['value']}
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
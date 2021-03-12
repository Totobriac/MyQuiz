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
  fontSize: object

  plotFF: string
  actFF: string

  plotFS: number
  actFS: number

  changeColor: object

  plotBack: string
  actBack: string

  plotOpacity: number
  actorOpacity: number

  plotCorn: string
  actCorn: string

  isBold: object

  plotBorder: string
  actorBorder: string

  display: string

  posterSrc: any

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
    if (fontSize['question'] == 1) {
      this.plotFS = fontSize['value']}    
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
    if (opacity['question'] == 1) {
      this.plotOpacity = opacity['value']}
    else if (opacity['question'] == 2) {
      this.actorOpacity= opacity['value']} 
  }

  setCornerStyle(cornerStyle) {
    if (cornerStyle['question'] == 1) {
      this.plotCorn = cornerStyle['value']}
    else if (cornerStyle['question'] == 2) {
      this.actCorn = cornerStyle['value']}
  }

  isTextBold(bold) {
    this.isBold = bold
  }

  whichBorder(border) {
    console.log(border)
    if (border['question'] == 1) {
      this.plotBorder = border['value']}
    else if (border['question'] == 2) {
      this.actorBorder = border['value']}
  }

  selectedDisplay(display) {
    this.display = display
  }

  getPosterSrc(src) {
    this.posterSrc = src
  }
}
import { Component } from '@angular/core';
import { ServiceService} from './service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'myMovieQuiz';
  value: string
  quizedMovie: any;
  selectedQuestion: any = 1;
  selectedMovieTrailer: string
  movieList: string[]

  constructor(private service: ServiceService) {}

  selectedMovie(movie) {
    this.selectedQuestion = 1
    this.quizedMovie = movie} 

  selectQuestion(questionType) {
    this.selectedQuestion = questionType
    console.log(this.selectedQuestion)}

  getMovieTrailer(trailer) {
    this.selectedMovieTrailer = trailer
  }

  submitForm(movie: string) {
    console.log(movie)      
    this.service.searchMovies(movie)       
    .subscribe((r:any) => { this.movieList = r})                             
  }

}
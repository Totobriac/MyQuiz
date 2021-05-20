import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from './services/movie-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('showTools', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0',
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('1s 1s')
      ]),
    ]),
  ]

})
export class AppComponent {

  title = 'myMovieQuiz';
  selectedMovieTrailer: string;
  display: string;
  subscription: Subscription;
  component: number;

  constructor( private movieData: MovieDataService) {}

  ngOnInit() {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
  }

  getMovieTrailer(trailer) {
    this.selectedMovieTrailer = trailer
  }
  
  selectedDisplay(display) {
    this.display = display
  }
}

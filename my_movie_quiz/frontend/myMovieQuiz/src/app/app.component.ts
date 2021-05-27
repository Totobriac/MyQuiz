import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
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
      })),
      state('hide', style({
        transform: 'translateY(202px)'
      })),
      transition('show => hide', [
        animate('2s 0.5s')
      ]),
      transition('hide => show', [
        animate('2s', keyframes([
          style({ transform : 'translateY(-24px)', offset: 0.7 }),
          style({ transform : 'translateY(0)', offset: 1 }),
        ]))
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

  constructor(private movieData: MovieDataService) { }

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

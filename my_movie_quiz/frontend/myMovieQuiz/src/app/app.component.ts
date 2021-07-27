import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from './interfaces/actor';
import { ActorTools } from './interfaces/actorTools';
import { Answer } from './interfaces/answer';
import { MovieDb } from './interfaces/movie';
import { PlotTools } from './interfaces/plotTools';
import { ActorDataService } from './services/actor-data.service';
import { ActorToolsDataService } from './services/actorTools-data.service';
import { AnswerDataService } from './services/answer-data.service';
import { MovieDataService } from './services/movie-data.service';
import { PlotToolsDataService } from './services/plotTools-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('showTools', [
      state('show', style({
        transform: 'translateY(0px)'
      })),
      state('hide', style({
        transform: 'translateY(202px)'
      })),
      transition('show => hide', [
        animate('2s 0.5s')
      ]),
      transition('hide => show', [
        animate('2s', keyframes([
          style({ transform: 'translateY(-24px)', offset: 0.7 }),
          style({ transform: 'translateY(0)', offset: 1 }),
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
  showTool: boolean;
  movie: MovieDb;
  answer: Answer;

  plotTools: PlotTools
  actor: Actor;
  actorTools: ActorTools;

  constructor(private movieData: MovieDataService,
    private answerData: AnswerDataService,
    private plotData: PlotToolsDataService,
    private actorData: ActorDataService,
    private actorToolsData: ActorToolsDataService) { }

  ngOnInit() {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component);
    this.subscription = this.movieData.currentShowTool.subscribe(showTool => this.showTool = showTool);
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.answerData.currentAnswerTools.subscribe(answer => this.answer = answer);
    this.subscription = this.plotData.currentPlotTools.subscribe(plotTools => this.plotTools = plotTools);
    this.subscription = this.actorData.currentActor.subscribe(actor => this.actor = actor);
    this.subscription = this.actorToolsData.currentActorTools.subscribe(actorTools => this.actorTools = actorTools);
  }

  getMovieTrailer(trailer) {
    this.selectedMovieTrailer = trailer
  }

  selectedDisplay(display) {
    this.display = display
  }

  getBackImg() {
    var backImg
    this.answer.backgrounds[0] === "empty"
      ? backImg = 'https://image.tmdb.org/t/p/w1280' + this.movie.backdrop
      : backImg = this.answer.background.highUrl
    return (backImg)
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActorTools } from '../interfaces/actorTools';
import { MusicCard } from '../interfaces/music';
import { PlotTools } from '../interfaces/plotTools';
import { PosterTools } from '../interfaces/posterTools';
import { ActorToolsDataService } from '../services/actorTools-data.service';
import { MovieDataService } from '../services/movie-data.service';
import { MusicDataService } from '../services/music-data.service';
import { PlotToolsDataService } from '../services/plotTools-data.service';
import { PosterToolsDataService } from '../services/posterTools-data.service';
import { TrailerToolsDataService } from '../services/trailerTools-data.service';


@Component({
  selector: 'app-qaswitch',
  templateUrl: './qaswitch.component.html',
  styleUrls: ['./qaswitch.component.css']
})
export class QASwitchComponent implements OnInit {

  selectedPage: string;
  subscription: Subscription;
  component: number;
  actorTools: ActorTools;
  plotTools: PlotTools;
  posterTools: PosterTools;
  trailerTools: any;
  musicCard: MusicCard;

  constructor(
    private movieData: MovieDataService,
    private plotToolService: PlotToolsDataService,
    private actorToolService: ActorToolsDataService,
    private posterToolService: PosterToolsDataService,
    private trailerToolService: TrailerToolsDataService,
    private musicService: MusicDataService,) { }


  ngOnInit() {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
    this.subscription = this.plotToolService.currentPlotTools.subscribe(plotTools => this.plotTools = plotTools)
    this.subscription = this.actorToolService.currentActorTools.subscribe(actorTools => this.actorTools = actorTools)
    this.subscription = this.posterToolService.currentPosterTools.subscribe(posterTools => this.posterTools = posterTools)
    this.subscription = this.trailerToolService.currentTrailerTools.subscribe(trailerTools => this.trailerTools = trailerTools)
    this.subscription = this.musicService.currentMusicCard.subscribe(musicCard => this.musicCard = musicCard)
    if (this.component == 1) {
      this.plotTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 2) {
      this.actorTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 3) {
      this.posterTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 4) {
      this.trailerTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 5) {
      this.musicCard.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    }
  }

  toggle() {
    if (this.component == 1) {
      this.plotTools.card == "answer"
        ? this.plotToolService.changeCard("question")
        : this.plotToolService.changeCard("answer")
      this.plotTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 2) {
      this.actorTools.card == "answer"
        ? this.actorToolService.changeCard("question")
        : this.actorToolService.changeCard("answer")
      this.actorTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 3) {
      this.posterTools.card == "answer"
        ? this.posterToolService.changeCard("question")
        : this.posterToolService.changeCard("answer")
      this.posterTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 4) {
      this.trailerTools.card == "answer"
        ? this.trailerToolService.changeCard("question")
        : this.trailerToolService.changeCard("answer")
      this.trailerTools.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    } else if (this.component == 5) {
      this.musicCard.card == "answer"
        ? this.musicService.changeCard("question")
        : this.musicService.changeCard("answer")
      this.musicCard.card == "answer"
        ? this.selectedPage = "question"
        : this.selectedPage = "answer"
    }
  }

  getBackColor() {
    var cl
    this.selectedPage == "answer" ? cl = 'answer-color' : cl = 'question-color'
    return cl
  }
}

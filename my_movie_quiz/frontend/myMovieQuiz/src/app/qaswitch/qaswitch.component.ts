import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActorTools } from '../interfaces/actorTools';
import { PlotTools } from '../interfaces/plotTools';
import { PosterTools } from '../interfaces/posterTools';
import { ActorToolsDataService } from '../services/actorTools-data.service';
import { MovieDataService } from '../services/movie-data.service';
import { PlotToolsDataService } from '../services/plotTools-data.service';
import { PosterToolsDataService } from '../services/posterTools-data.service';


@Component({
  selector: 'app-qaswitch',
  templateUrl: './qaswitch.component.html',
  styleUrls: ['./qaswitch.component.css']
})
export class QASwitchComponent implements OnInit {

  @Output() setSection = new EventEmitter();
  showQuestion: boolean;
  selectedPage: string;
  subscription: Subscription;
  component: number;
  actorTools: ActorTools;
  plotTools: PlotTools;
  posterTools: PosterTools;

  constructor(
    private movieData: MovieDataService,
    private plotToolService: PlotToolsDataService,
    private actorToolService: ActorToolsDataService,
    private posterToolService: PosterToolsDataService,) { }

  ngOnInit() {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
    this.subscription = this.plotToolService.currentPlotTools.subscribe(plotTools => this.plotTools = plotTools)
    this.subscription = this.actorToolService.currentActorTools.subscribe(actorTools => this.actorTools = actorTools)
    this.subscription = this.posterToolService.currentPosterTools.subscribe(posterTools => this.posterTools = posterTools)
    if (this.component == 1) {
      this.plotTools.card == "question"
        ? this.selectedPage = "answer"
        : this.selectedPage = "question";
      this.plotTools.card == "question"
        ? this.showQuestion = true
        : this.showQuestion = false;
    } else if (this.component == 2) {
      this.actorTools.card == "question"
        ? this.selectedPage = "answer"
        : this.selectedPage = "question";
      this.actorTools.card == "question"
        ? this.showQuestion = true
        : this.showQuestion = false;
    } else if (this.component == 3) {
      this.posterTools.card == "question"
        ? this.selectedPage = "answer"
        : this.selectedPage = "question";
      this.posterTools.card == "question"
        ? this.showQuestion = true
        : this.showQuestion = false;
    }
  }

  toggle() {
    this.showQuestion = !this.showQuestion
    this.setSection.emit(this.showQuestion)
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
    }
  }

  getBackColor() {
    var cl
    this.selectedPage == "answer" ? cl = 'answer-color' : cl = 'question-color'
    return cl
  }
}

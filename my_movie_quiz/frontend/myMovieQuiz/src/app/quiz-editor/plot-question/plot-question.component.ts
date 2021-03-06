import { Component, OnInit, } from '@angular/core';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { cardChange, flyingTool } from 'src/app/animations';

@Component({
  selector: 'app-plot-question',
  templateUrl: './plot-question.component.html',
  styleUrls: ['./plot-question.component.css'],
  animations: [ flyingTool, cardChange ]
})

export class PlotQuestionComponent implements OnInit {

  editable = "false";
  movie: MovieDb;
  tools: PlotTools;
  subscription: Subscription;
  toolColor: string;

  constructor(private movieData: MovieDataService,
    private plotTools: PlotToolsDataService,
    private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.plotTools.currentPlotTools.subscribe(tools => this.tools = tools);
    console.log(this.tools.card);
  }

  enableEdition() {
    this.editable == "false" ? this.editable = "true" : this.editable = "false"
  }

  shuffle() {
    this.movie.plot = this.movie.plot.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ').replace(".", "") + "."
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)' 
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }
}

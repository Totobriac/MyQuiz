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
  animations: [flyingTool, cardChange]
})

export class PlotQuestionComponent implements OnInit {

  editable = "false";
  movie: MovieDb;
  tools: PlotTools;
  subscription: Subscription;
  toolColor: string;
  inputValue: string;

  constructor(private movieData: MovieDataService,
    private plotTools: PlotToolsDataService,
    private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.plotTools.currentPlotTools.subscribe(tools => this.tools = tools);
  }

  enableEdition() {
    if (this.tools.editable == false) {
      this.plotTools.changeEditable(true)
    }
    else {
      this.plotTools.changeEditable(false);
      this.plotTools.changePlot(this.inputValue);
    }
  }

  fetchPlot() {
    var plot
    this.tools.plot == "empty"
      ? plot = this.movie.plot
      : plot = this.tools.plot
    return plot
  }

  shuffle() {
    var plot
    this.tools.plot == "empty"
      ? plot = this.movie.plot
      : plot = this.tools.plot
    plot = plot.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ').replace(".", "") + "."
    this.plotTools.changePlot(plot);
  }

  onKey(event) {
    this.inputValue = event.target.innerText;
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

}

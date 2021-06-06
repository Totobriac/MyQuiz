import { Component, OnInit, } from '@angular/core';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { PlotTools} from 'src/app/interfaces/plotTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';

@Component({
  selector: 'app-plot-question',
  templateUrl: './plot-question.component.html',
  styleUrls: ['./plot-question.component.css']
})

export class PlotQuestionComponent implements OnInit {
  
  showQuestion = true;
  editable = "false";
  movie: MovieDb;
  tools: PlotTools;
  subscription: Subscription;

  constructor(private movieData: MovieDataService,
              private plotTools: PlotToolsDataService) { }


  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.plotTools.currentPlotTools.subscribe(tools => this.tools = tools);
  }
 
  enableEdition() {
    this.editable == "false" ?  this.editable = "true" : this.editable = "false"
  }

  shuffle() {
    this.movie.plot = this.movie.plot.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ').replace(".","") + "."
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }
}

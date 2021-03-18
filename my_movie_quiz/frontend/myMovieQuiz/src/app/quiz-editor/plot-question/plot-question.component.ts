import { Component, OnInit, } from '@angular/core';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { PlotTools} from 'src/app/interfaces/plotTools';


@Component({
  selector: 'app-plot-question',
  templateUrl: './plot-question.component.html',
  styleUrls: ['./plot-question.component.css']
})
export class PlotQuestionComponent implements OnInit {
  
  showQuestion = true
  editable = "false"

  movie: Movie;
  tools: PlotTools;
  subscription: Subscription;

  constructor(private data: MovieDataService) { }


  ngOnInit(): void {
    this.subscription = this.data.currentMovie.subscribe(movie => this.movie = movie)
    this.subscription = this.data.currentPlotTools.subscribe(tools => this.tools = tools)
  }
 
  enableEdition() {
    console.log(this.tools);  
    this.editable == "false" ?  this.editable = "true" : this.editable = "false"
  }

  shuffle() {
    this.movie.plot = this.movie.plot.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ').replace(".","") + "."
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

}

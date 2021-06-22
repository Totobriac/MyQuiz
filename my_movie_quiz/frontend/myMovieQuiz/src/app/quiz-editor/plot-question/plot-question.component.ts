import { Component, OnInit, } from '@angular/core';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-plot-question',
  templateUrl: './plot-question.component.html',
  styleUrls: ['./plot-question.component.css'],
  animations: [
    trigger('flyingTool', [
      transition(':enter', [
        animate('1s ease-out', keyframes([
          style({ transform: 'translateX(-100%)', opacity: '0', offset: 0 }),
          style({ transform: 'translateX(10%)', opacity: '1', offset: 0.8 }),
          style({ transform: 'translateX(0%)', opacity: '1', offset: 1.0 })
        ]))
      ]),
      transition(':leave', [
        animate('600ms ease-in', keyframes([
          style({ transform: 'translateX(-10%)', opacity: '1', offset: 0.3 }),
          style({ transform: 'translateX(100%)', opacity: '0', offset: 1.0 })
        ]))
      ])
    ]),
    trigger('cardChange', [
      transition((fromState: string, toState: string) => toState != fromState, [
        animate(100, style({ transform: 'rotate(0.2deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' })),
        animate(100, style({ transform: 'rotate(-0.2deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' })),
        animate(100, style({ transform: 'rotate(0.2deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' }))
      ])
    ])
  ]
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

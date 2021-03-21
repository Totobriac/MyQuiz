import { Component,  OnInit, Input } from '@angular/core';
import { MovieDataService } from "../services/movie-data.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-top-display',
  templateUrl: './top-display.component.html',
  styleUrls: ['./top-display.component.css']
})
export class TopDisplayComponent implements OnInit {

  backdrop: any
  component: number
  subscription: Subscription

  constructor(private movieData: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.backdrop = movie.backdrop)
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
  }
}
  

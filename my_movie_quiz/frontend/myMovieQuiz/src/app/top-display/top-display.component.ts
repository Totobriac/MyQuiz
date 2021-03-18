import { Component,  OnInit, Input } from '@angular/core';
import { MovieDataService } from "../services/movie-data.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-top-display',
  templateUrl: './top-display.component.html',
  styleUrls: ['./top-display.component.css']
})
export class TopDisplayComponent implements OnInit {

  @Input() component: number

  backdrop: any
  subscription: Subscription

  constructor(private data: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMovieDb.subscribe(movie => this.backdrop = movie.backdrop)
  }
}
  

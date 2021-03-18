import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-curtain',
  templateUrl: './curtain.component.html',
  styleUrls: ['./curtain.component.css']
})
export class CurtainComponent implements OnInit {

  backdrop: any
  subscription: Subscription

  constructor(private data: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMovieDb.subscribe(movie => this.backdrop = movie.backdrop)
  }
}

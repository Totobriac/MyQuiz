import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieAuto } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  subscription : Subscription
  autoMovie : MovieAuto[]

  constructor(private movieData: MovieDataService,) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieAuto.subscribe(autoMovie => this.autoMovie = autoMovie)
  }

}

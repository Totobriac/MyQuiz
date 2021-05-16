import { Component, OnInit, } from '@angular/core';
import { AutoResponse } from '../interfaces/movie';
import { SearchMovieService } from './search-movie.service';
import { MovieDataService } from "../services/movie-data.service";
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  value: any
  component: number
  searchMoviesCtrl = new FormControl();
  searchPeopleCtrl = new FormControl();
  isLoading: boolean = false;
  errorMsg: string
  subscription: Subscription;
  selected: string = "Movie";
  response: AutoResponse[] = []
  responseMovies: any = [];
  responsePeoples: any = [];

  constructor(private searchMovieService: SearchMovieService,
              private movieData: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)

    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.response = [];
          this.isLoading = true;
        }),
        switchMap(value => this.searchMovieService.autoMovie(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.errorMsg = "nothing";
          this.response = [];
        } else {
          this.errorMsg = "";
          this.responseMovies = data;
          for (var movie in this.responseMovies) {
            if (this.responseMovies[movie]["vote_count"] < 150) {
              this.responseMovies[movie] = null;
              continue;
            }
            if (this.responseMovies[movie] != null) {
              for (var genre of this.responseMovies[movie]["genre_ids"]) {
                if ([16, 99, 10402, 10770].includes(genre)) {
                  this.responseMovies[movie] = null;
                  continue;
                }
              }
            }
            if (this.responseMovies[movie] != null) {
              this.response.push({"data": "movie", "id": this.responseMovies[movie]["id"], "name": this.responseMovies[movie]["title"], "url": this.responseMovies[movie]["poster_path"],
                                  "backdrop": this.responseMovies[movie]["backdrop_path"], "plot": this.responseMovies[movie]["overview"], "year": this.responseMovies[movie]["release_date"]})
            }
          }
          this.movieData.changeMovieAuto(this.response);
          if (this.component != 6) {
            this.movieData.changeComponent(6)
          };
        }
      }
    );
    
    this.searchPeopleCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.response = [];
          this.isLoading = true;
        }),
        switchMap(value => this.searchMovieService.autoPeople(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        console.log(data);
        if (data == undefined) {
          this.errorMsg = "nothing";
          this.response = [];
        } else {
          this.errorMsg = "";
          this.responsePeoples = data;
          for (var people of this.responsePeoples) {
            if (people["known_for_department"] == "Acting" && people["profile_path"] != null) {
              this.response.push({"data": "people", "id": people["id"], "name": people["name"], "url": people["profile_path"],
                                  "backdrop": "", "plot": "", "year": ""})

            }            
          }
          this.movieData.changeMovieAuto(this.response);
          if (this.component != 6) {
            this.movieData.changeComponent(6)
          };
      }
      }
    );  
  }

  select(selected) {
    this.selected= selected
  }
}

import { Component, OnInit, } from '@angular/core';
import { MovieDb } from '../interfaces/movie';
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
  filteredMovies: any;
  responseMovies: any;
  isLoading: boolean = false;
  errorMsg: string
  subscription: Subscription;

  constructor(private searchMovieService: SearchMovieService,
    private movieData: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap(value => this.searchMovieService.autocomplete(value)
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
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.responseMovies = data["results"];
          
          for (var movie in this.responseMovies) {
            if (this.responseMovies[movie]["vote_count"] < 150) {
              this.responseMovies[movie] = null;
            }
            if(this.responseMovies[movie] != null){
              for (var genre of this.responseMovies[movie]["genre_ids"]) {
                if ([16, 99, 10402, 10770].includes(genre)) {
                  this.responseMovies[movie] = null;
                  break;
                }
              }
            }
          }
          this.movieData.changeMovieAuto(this.responseMovies);
          if (this.component != 6) {
            this.movieData.changeComponent(6)
          };
        }
      });
  }

  submitForm(movie: string) {
    console.log(movie)
    this.searchMovieService.searchMovies(movie)
      .subscribe((r: MovieDb[]) => {
        r.sort(function (a, b) {
          var c: any = new Date(a.year);
          var d: any = new Date(b.year);
          return c - d;
        });
        this.movieData.changeMovieList(r)
        console.log(r)
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoResponse, MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  subscription: Subscription
  autoResponse: AutoResponse[]
  movieList: MovieDb[]
  selectedMovieTitle: string = ""
  response: AutoResponse[] = []
  responseMovies: any = [];

  constructor(private movieData: MovieDataService,
              private search: SearchService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieAuto.subscribe(autoResponse => this.autoResponse = autoResponse)
    this.subscription = this.movieData.currentMovieList.subscribe(movieList => this.movieList = movieList)
  }

  select(response, i) {
    if (response["data"] == "movie") {
      this.search.searchMovies(response["id"])
      .subscribe(r => {
        var castList: { name: string; character: string; profile_path: string; }[] = [];
        for (var cast of r['cast']) {
          castList.push({"name": cast["name"], "character": cast["character"], "profile_path": cast["profile_path"]})
        }
        var movie = new MovieDb(response["backdrop"], response["id"], response["url"],
                                response["name"], response["year"], response["plot"],
                                0, castList, r["composers"])
        this.movieList.push(movie);
        this.movieData.changeMovieList(this.movieList)     
      })
    }
    else {
      this.search.searchPerson(response["id"])
        .subscribe(r => {
          this.response = []
          console.log(r)
          this.responseMovies = r;
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
              this.response.push({
                "data": "movie", "id": this.responseMovies[movie]["id"], "name": this.responseMovies[movie]["title"], "url": this.responseMovies[movie]["poster_path"],
                "backdrop": this.responseMovies[movie]["backdrop_path"], "plot": this.responseMovies[movie]["overview"], "year": this.responseMovies[movie]["release_date"]
              })
            }
          }
          this.movieData.changeMovieAuto(this.response);
        })
    }
  }

  showInfo(i: number) {
    this.selectedMovieTitle = this.autoResponse[i]["name"];
  }

  hideInfo() {
    this.selectedMovieTitle = ""
  }

}

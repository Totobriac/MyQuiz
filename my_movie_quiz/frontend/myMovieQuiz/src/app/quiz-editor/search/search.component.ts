import { animate, animateChild, group, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutoResponse, MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('openClose', [
      state('closed', style({
        height: '526px'
      })),
      state('open', style({
        height: '450px',
      })),
      transition('open => closed', [
        animate('0.5s 1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
    ,
    trigger('showHide', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0',
      })),
      transition('show => hide', [
        animate('1s')
      ]),
      transition('hide => show', [
        animate('1s 1s')
      ]),
    ]),
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('200ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),
        // query(':leave', stagger('200ms', [
        //   animate('600ms ease-out', keyframes([
        //     style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
        //     style({ opacity: .7, transform: 'scale(.5)', offset: 0.4 }),
        //     style({ opacity: 0, transform: 'scale(0) rotate(720deg)', offset: 1 }),
        //   ]))]), { optional: true })
        query(':leave', [
          animate('600ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .7, transform: 'scale(.5)', offset: 0.4 }),
            style({ opacity: 0, transform: 'scale(0) rotate(720deg)', offset: 1 }),
          ]))], { optional: true })
      ]),
    ]),
    trigger('showImg', [
      transition(':enter', [
        style({ transform: 'rotateY(179deg)', opacity: '0' }),
        animate('1000ms 500ms', style({ transform: 'rotateY(0deg) rotateZ(360deg)', opacity: '1' })
        )]),
      transition(':leave', [
        style({ transform: 'rotateY(0)', opacity: '1' }),
        animate('500ms', style({ transform: 'rotateY(90deg)', opacity: '0' })
        )]),
    ]),
    trigger('showDiv', [
      transition(':enter', [
        style({ opacity: '0' }),
        group([
          animate('1000ms', style({ opacity: '1' })),
          query('@showImg', animateChild()),
        ]),
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        group([
          animate('1000ms', style({ opacity: '0' })),
          query('@showImg', animateChild()),
        ]),
      ]),

    ]),

  ]
})
export class SearchComponent implements OnInit {

  subscription: Subscription;
  autoResponse: AutoResponse[];
  movieList: MovieDb[];
  selectedMovieTitle: string = "";
  response: AutoResponse[] = [];
  responseMovies: any = [];
  isOpen: boolean = false;
  enlarge: boolean = false;
  selected: AutoResponse;

  constructor(private movieData: MovieDataService,
    private search: SearchService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieAuto.subscribe(autoResponse => this.autoResponse = autoResponse)
    this.subscription = this.movieData.currentMovieList.subscribe(movieList => this.movieList = movieList)
  }

  select(response, i) {
    this.autoResponse.splice(i, 1)
    if (response["data"] == "movie" || response["data"] == "discover") {
      this.search.searchMovies(response["id"])
        .subscribe(r => {
          var castList: { name: string; character: string; profile_path: string; }[] = [];
          for (var cast of r['cast']) {
            castList.push({ "name": cast["name"], "character": cast["character"], "profile_path": cast["profile_path"] })
          }
          var movie = new MovieDb(response["backdrop"], response["id"], response["url"],
            response["name"], response["year"], response["plot"],
            0, castList, r["composers"])
          this.movieList.push(movie);
          this.movieData.changeMovieList(this.movieList)
        })
    }
    else {
      this.search.searchPerson(response["id"], response["data"])
        .subscribe(r => {
          this.response = []
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
            if ((this.responseMovies[movie] != null && response["data"] == "Acting") || (this.responseMovies[movie] != null && response["data"] == "Directing" && this.responseMovies[movie]["department"] == "Directing")) {
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

  showFilter() {
    this.isOpen = !this.isOpen;
  }

  showLarge(i) {
    this.enlarge = !this.enlarge
    this.selected = this.autoResponse[i]
  }
}

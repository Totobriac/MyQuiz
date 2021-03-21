import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie, MovieDb,} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})

export class MovieDataService {

  private movie = new BehaviorSubject({} as Movie);
  currentMovie = this.movie.asObservable();

  private movieDb = new BehaviorSubject({} as MovieDb);
  currentMovieDb = this.movieDb.asObservable();

  private movieList = new BehaviorSubject([] as MovieDb[]);
  currentMovieList = this.movieList.asObservable();

  private component = new BehaviorSubject(0);
  currentComponent = this.component.asObservable();
  currentActor: any;

  changeMovie(movie: Movie) {
    this.movie.next(movie)
  }

  changeMovieDb(movie: MovieDb) {
    this.movieDb.next(movie)
  }

  changeMovieList(movieList: MovieDb[]) {
    this.movieList.next(movieList)
  }

  changeComponent(component: number) {
    this.component.next(component)
  }
}

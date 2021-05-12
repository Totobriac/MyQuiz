import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieDb, MovieAuto} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})

export class MovieDataService {

  private movieDb = new BehaviorSubject({} as MovieDb);
  currentMovieDb = this.movieDb.asObservable();

  private movieList = new BehaviorSubject([] as MovieDb[]);
  currentMovieList = this.movieList.asObservable();

  private component = new BehaviorSubject(0);
  currentComponent = this.component.asObservable();

  private autocomplete = new BehaviorSubject([] as MovieAuto[]);
  currentMovieAuto = this.autocomplete.asObservable();

  changeMovieDb(movie: MovieDb) {
    this.movieDb.next(movie)
  }

  changeMovieTrailer(trailer: any) {
    this.movieDb.next(Object.assign(this.movieDb.value, {trailer: trailer}))
  }

  changeMovieList(movieList: MovieDb[]) {
    this.movieList.next(movieList)
  }

  changeComponent(component: number) {
    this.component.next(component)
  }

  changeMovieAuto(list: MovieAuto[]) {
    this.autocomplete.next(list)
  }
  
}

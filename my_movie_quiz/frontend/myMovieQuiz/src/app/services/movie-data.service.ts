import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieDb, AutoResponse } from '../interfaces/movie';

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

  private tool = new BehaviorSubject(0);
  currentTool = this.tool.asObservable();

  private autocomplete = new BehaviorSubject([] as AutoResponse[]);
  currentMovieAuto = this.autocomplete.asObservable();

  private showTool = new BehaviorSubject(false);
  currentShowTool = this.showTool.asObservable();
  

  changeMovieDb(movie: MovieDb) {
    this.movieDb.next(movie)
  }

  changeShowTool(show: boolean) {
    this.showTool.next(show)
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

  changeTool(tool: number) {
    this.tool.next(tool)
  }

  changeMovieAuto(list: AutoResponse[]) {
    this.autocomplete.next(list)
  }
}

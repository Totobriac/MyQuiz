import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie, MovieDb,} from '../interfaces/movie';
import { PlotTools,} from '../interfaces/plotTools';
import { ActorTools,} from '../interfaces/actorTools';

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

  private plotTools = new BehaviorSubject<PlotTools>({  fontSize: 32,
                                                        fontFamily: {index: 0, 
                                                                     value: "'Roboto', sans-serif", 
                                                                     display: "Regular"},
                                                        background: { author_name: "none",
                                                                      highUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
                                                                      id: 1,
                                                                      lowUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
                                                                      stock_name: "none"
                                                                    },
                                                        backgrounds: [],
                                                        opacity: 0.7,
                                                        corner: {value:"0px",
                                                                 index:0},
                                                        weight: "normal",
                                                        border: { index: 0,
                                                                  value: "0px",
                                                                },
                                                        backColor: "255, 255, 255",
                                                        fontColor: "0 , 0, 0",
                                                        borderColor: "0, 0, 0",
                                                        palette: "none",
                                                        colorArea: "font"})
currentPlotTools = this.plotTools.asObservable();

private actorTools = new BehaviorSubject<ActorTools>({  fontFamily: {index: 0, 
                                                        value: "'Roboto', sans-serif", 
                                                        display: "Regular"},
                                                        background: { author_name: "none",
                                                                      highUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
                                                                      id: 1,
                                                                      lowUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
                                                                      stock_name: "none"
                                                                      },
                                                          backgrounds: [],
                                                          opacity: 0.7,
                                                          corner: {value:"0px",
                                                                   index:0},
                                                          weight: "normal",
                                                          border: { index: 0,
                                                                    value: "0px",
                                                                  },
                                                          backColor: "255, 255, 255",
                                                          fontColor: "0 , 0, 0",
                                                          borderColor: "0, 0, 0",
                                                          palette: "none",
                                                          colorArea: "font"})  

  currentActorTools = this.actorTools.asObservable();

  constructor() { }

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

  changeFontSize(size: number) {
    this.plotTools.next(Object.assign(this.plotTools.value, {fontSize: size }))
  }

  changeOpacity(opacity: number) {
    this.plotTools.next(Object.assign(this.plotTools.value, {opacity: opacity }))
  }

  changeCorner(corner: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, {corner: corner }))
  }

  changeBorder(border: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, {border: border }))
  }

  changeFontFamily(family: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, {fontFamily: family }))
  }

  changeTheme(backgrounds: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, {backgrounds: backgrounds}))
  }

  changeBackground(background: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, {background: background}))
  }

  changeWeight(weight: string) {
    this.plotTools.next(Object.assign(this.plotTools.value, {weight: weight}))
  }

  changePalette(tool: string) {
    this.plotTools.next(Object.assign(this.plotTools.value, {palette: tool}))
  }

  changeBackColor(color: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, {backColor: color}))
  }

  changeFontColor(color: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, {fontColor: color}))
  }

  changeBorderColor(color: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, {borderColor: color}))
  }

  //Actors Tools //

  changeOpacityA(opacity: number) {
    this.actorTools.next(Object.assign(this.actorTools.value, {opacity: opacity }))
  }

  changeCornerA(corner: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, {corner: corner }))
  }

  changeBorderA(border: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, {border: border }))
  }

  changeFontFamilyA(family: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, {fontFamily: family }))
  }

  changeThemeA(backgrounds: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, {backgrounds: backgrounds}))
  }

  changeBackgroundA(background: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, {background: background}))
  }

  changeWeightA(weight: string) {
    this.actorTools.next(Object.assign(this.actorTools.value, {weight: weight}))
  }

  changePaletteA(tool: string) {
    this.actorTools.next(Object.assign(this.actorTools.value, {palette: tool}))
  }

  changeBackColorA(color: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, {backColor: color}))
  }

  changeFontColorA(color: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, {fontColor: color}))
  }

  changeBorderColorA(color: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, {borderColor: color}))
  }

}

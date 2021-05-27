import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PosterTools } from '../interfaces/posterTools';


@Injectable({
  providedIn: 'root',
})

export class PosterToolsDataService {

  constructor() { }

  private posterTools = new BehaviorSubject<PosterTools>({
    background: {
      author_name: "none",
      highUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
      id: 1,
      lowUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
      stock_name: "none"
    },
    backgrounds: [],
    posterSrc: "",
    border: {
      index: 0,
      value: "0px",
    },
    borderColor: "0, 0, 0",
    palette: "none",
  })

  currentPosterTools = this.posterTools.asObservable();

  changeTheme(backgrounds: any) {
    this.posterTools.next(Object.assign(this.posterTools.value, {backgrounds: backgrounds}))
  }

  changeBackground(background: object) {
    this.posterTools.next(Object.assign(this.posterTools.value, {background: background}))
  }

  changePosterSrc(posterSrc: string) {
    this.posterTools.next(Object.assign(this.posterTools.value, {posterSrc: posterSrc}))
  }

  changeBorder(border: object) {
    this.posterTools.next(Object.assign(this.posterTools.value, {border: border }))
  }

  changeBorderColor(color: any) {
    this.posterTools.next(Object.assign(this.posterTools.value, {borderColor: color}))
  }

  changePalette(tool: string) {
    this.posterTools.next(Object.assign(this.posterTools.value, {palette: tool}))
  }

}
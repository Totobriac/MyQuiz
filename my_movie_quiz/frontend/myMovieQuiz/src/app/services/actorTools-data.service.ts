import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActorTools } from '../interfaces/actorTools';

@Injectable({
  providedIn: 'root',
})
export class ActorToolsDataService {

  constructor() { }

  private actorTools = new BehaviorSubject<ActorTools>({
    fontSize: 34,
    fontFamily: {
      index: 0,
      value: "'Roboto', sans-serif",
      display: "Regular"
    },
    background: {
      author_name: "none",
      highUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/actors/bobines.jpg",
      id: 1,
      lowUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
      stock_name: "none"
    },
    backgrounds: [],
    opacity: 0.7,
    corner: {
      value: "0px",
      index: 0
    },
    weight: "normal",
    border: {
      index: 0,
      value: "0px",
    },
    backColor: "255, 255, 255",
    fontColor: "0 , 0, 0",
    borderColor: "0, 0, 0",
    palette: "none",
    card: "question",
  })

  currentActorTools = this.actorTools.asObservable();

  changeOpacity(opacity: number) {
    this.actorTools.next(Object.assign(this.actorTools.value, { opacity: opacity }))
  }

  changeCorner(corner: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, { corner: corner }))
  }

  changeBorder(border: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, { border: border }))
  }

  changeFontFamily(family: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, { fontFamily: family }))
  }

  changeTheme(backgrounds: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, { backgrounds: backgrounds }))
  }

  changeBackground(background: object) {
    this.actorTools.next(Object.assign(this.actorTools.value, { background: background }))
  }

  changeWeight(weight: string) {
    this.actorTools.next(Object.assign(this.actorTools.value, { weight: weight }))
  }

  changePalette(tool: string,) {
    this.actorTools.next(Object.assign(this.actorTools.value, { palette: tool }))
  }

  changeBackColor(color: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, { backColor: color }))
  }

  changeFontColor(color: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, { fontColor: color }))
  }

  changeBorderColor(color: any) {
    this.actorTools.next(Object.assign(this.actorTools.value, { borderColor: color }))
  }

  changeCard(card: string) {
    this.actorTools.next(Object.assign(this.actorTools.value, { card: card }))
  }

  changeFontSize(size: number) {
    this.actorTools.next(Object.assign(this.actorTools.value, { fontSize: size }))
  }
}
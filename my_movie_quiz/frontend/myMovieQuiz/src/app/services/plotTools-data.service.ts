import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlotTools } from '../interfaces/plotTools';


@Injectable({
  providedIn: 'root',
})

export class PlotToolsDataService {

  constructor() { }

  private plotTools = new BehaviorSubject<PlotTools>({
    fontSize: 26,
    fontFamily: {
      index: 0,
      value: "'Roboto', sans-serif",
      display: "Regular"
    },
    background: {
      author_name: "none",
      // highUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines.jpg",
      highUrl: "https://images.pexels.com/photos/4011762/pexels-photo-4011762.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=853&w=1280",
      id: 1,
      // lowUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
      lowUrl: "https://images.pexels.com/photos/4011762/pexels-photo-4011762.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=426&w=640",
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
    editable: false,
    plot: "empty"
  })

  currentPlotTools = this.plotTools.asObservable();

  changeFontSize(size: number) {
    this.plotTools.next(Object.assign(this.plotTools.value, { fontSize: size }))
  }

  changeOpacity(opacity: number) {
    this.plotTools.next(Object.assign(this.plotTools.value, { opacity: opacity }))
  }

  changeCorner(corner: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, { corner: corner }))
  }

  changeBorder(border: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, { border: border }))
  }

  changeFontFamily(family: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, { fontFamily: family }))
  }

  changeTheme(backgrounds: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, { backgrounds: backgrounds }))
  }

  changeBackground(background: object) {
    this.plotTools.next(Object.assign(this.plotTools.value, { background: background }))
  }

  changeWeight(weight: string) {
    this.plotTools.next(Object.assign(this.plotTools.value, { weight: weight }))
  }

  changePalette(tool: string) {
    this.plotTools.next(Object.assign(this.plotTools.value, { palette: tool }))
  }

  changeBackColor(color: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, { backColor: color }))
  }

  changeFontColor(color: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, { fontColor: color }))
  }

  changeBorderColor(color: any) {
    this.plotTools.next(Object.assign(this.plotTools.value, { borderColor: color }))
  }

  changeCard(card: string) {
    this.plotTools.next(Object.assign(this.plotTools.value, { card: card }))
  }

  changeEditable(editable: boolean) {
    this.plotTools.next(Object.assign(this.plotTools.value, { editable: editable }))
  }

  changePlot(plot: string) {
    this.plotTools.next(Object.assign(this.plotTools.value, { plot: plot }))
  }
}
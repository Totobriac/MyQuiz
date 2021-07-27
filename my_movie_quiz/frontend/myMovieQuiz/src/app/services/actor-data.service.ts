import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Actor } from '../interfaces/actor';

@Injectable({
  providedIn: 'root'
})

export class ActorDataService {

  private actor = new BehaviorSubject<Actor>({
    urls: [[{ index: 0, url: "" }],
    [{ index: 1, url: "" }],
    [{ index: 2, url: "" }],
    [{ index: 3, url: "" }]],
    pic: [{ index: 0, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" },
    { index: 1, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" },
    { index: 2, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" },
    { index: 3, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" }],
    pixUrls: [[{ picIndex: 0, index: 0, src: "" }],
    [{ picIndex: 0, index: 1, src: "" }],
    [{ picIndex: 0, index: 2, src: "" }],
    [{ picIndex: 0, index: 3, src: "" }]],
    pixValue: [0, 0, 0, 0],
    display: 1,
    names: [["", "", "", ""], ["", "", "", ""], ["", "", "", ""]]
  });

  currentActor = this.actor.asObservable();

  changeUrls(urls: any) {
    this.actor.next(Object.assign(this.actor.value, { urls: urls }))
  }

  changePic(pic: any) {
    this.actor.next(Object.assign(this.actor.value, { pic: pic }))
  }

  changePixUrls(pixUrls: any) {
    this.actor.next(Object.assign(this.actor.value, { pixUrls: pixUrls }))
  }

  changePicValue(pixValue: number[]) {
    this.actor.next(Object.assign(this.actor.value, { pixValue: pixValue }))
  }

  changeDisplayValue(display: number) {
    this.actor.next(Object.assign(this.actor.value, { display: display }))
  }

  changeNames(names: any) {
    this.actor.next(Object.assign(this.actor.value, { names: names }))
  }

  deletePicsUrls() {
    this.actor.next(Object.assign(this.actor.value, {
      urls: [[{ index: 0, url: "" }],
      [{ index: 1, url: "" }],
      [{ index: 2, url: "" }],
      [{ index: 3, url: "" }]],
      pic: [{ index: 0, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" },
      { index: 1, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" },
      { index: 2, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" },
      { index: 3, url: "https://media.giphy.com/media/WoDtSrCVHBmy4/giphy.gif" }],
    }))
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrailerTools } from '../interfaces/trailerTools';


@Injectable({
  providedIn: 'root',
})

export class TrailerToolsDataService {

  constructor() { }

  private trailerTools = new BehaviorSubject<TrailerTools>({
    videoSrcId: null,
    previewPic:[],
    scrapPic:[],
    card: "question",
    shooting: true,
  })

  currentTrailerTools = this.trailerTools.asObservable();

  changeVideoSrcId(videoSrcId: number) {
    this.trailerTools.next(Object.assign(this.trailerTools.value, {videoSrcId: videoSrcId}))
  }

  addPreviewPic(previewPic: any) {
    this.trailerTools.next(Object.assign(this.trailerTools.value, {previewPic: previewPic}))
  }

  addScrapPic(scrapPic: any) {
    this.trailerTools.next(Object.assign(this.trailerTools.value, {scrapPic: scrapPic}))
  }

  changeCard(card: string) {
    this.trailerTools.next(Object.assign(this.trailerTools.value, { card: card }))
  }

  changeShooting(shooting: boolean) {
    this.trailerTools.next(Object.assign(this.trailerTools.value, { shooting: shooting}))
  }
}

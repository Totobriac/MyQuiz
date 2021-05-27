import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Music,} from '../interfaces/music';

@Injectable({
  providedIn: 'root'
})

export class MusicDataService {

  private music = new BehaviorSubject({} as Music);
  currentMusic = this.music.asObservable();

  changeMainTitle(mainTitle: any) {
    this.music.next(Object.assign(this.music.value, {mainTitle: mainTitle}))
  }

  changeSamples(samples: object[]) {
    this.music.next(Object.assign(this.music.value, {samples: samples}))
  }

  changeCurrent(currentTrack: number) {
    this.music.next(Object.assign(this.music.value, {currentTrack: currentTrack}))
  }

  isPaused(isPaused: boolean) {
    this.music.next(Object.assign(this.music.value, {isPaused: isPaused}))
  }

  position(position: number) {
    this.music.next(Object.assign(this.music.value, {position: position}))
  }
}
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
}
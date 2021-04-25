import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Music } from 'src/app/interfaces/music';
import { MusicDataService } from 'src/app/services/music-data.service';
import { MusicPlayerService } from '../music-question/music-player.service';



@Component({
  selector: 'app-mixer',
  templateUrl: './mixer.component.html',
  styleUrls: ['./mixer.component.css']
})
export class MixerComponent implements OnInit {

  tracks: number[] = [1, 2, 3, 4, 5]
  subscription: Subscription;
  music: Music;
  endOffset = { x: 0, y: 0 };
  size: any

  constructor( private musicDataService: MusicDataService,
               private musicPlayerService: MusicPlayerService ) {}

  ngOnInit(): void {
    this.subscription = this.musicDataService.currentMusic.subscribe(music => this.music = music)
  }

  getWidth(i) {
    return (this.music.samples[i-1].duration * 20)
  }

  getHeight(i) {
    var height
    i == 0 ? height = (this.music.mainTitle.volume * 70) : height = (this.music.samples[i-1].volume * 70)
    return height
  }

  getTop(i) {
    var top
    i == 0 ? top = (70 - this.music.mainTitle.volume * 70) : top = (70 - this.music.samples[i-1].volume * 70)
    return top
  }

  onMoveEnd(event, i) {    
    var musicSamples = this.music.samples;
    musicSamples[i-1].start = event.x/20;
    this.musicDataService.changeSamples(musicSamples);
  }

  onResizeWidth(event, i) {
    var musicSamples = this.music.samples;
    musicSamples[i-1].duration = event.size.width/20;
    this.musicDataService.changeSamples(musicSamples);
  }

  onResizeHeight(event, i) {
    if (i == 0) {
      var mainTitle = this.music.mainTitle;
      mainTitle.volume = event.size.height/70;
      this.musicDataService.changeMainTitle(mainTitle);
      this.musicPlayerService.setMainVolume(event.size.height/70)
    } else {
      var musicSamples = this.music.samples;
      musicSamples[i-1].volume = event.size.height/70;
      this.musicDataService.changeSamples(musicSamples);
      this.musicPlayerService.setSampleVolume(i, event.size.height/70)}
  }

  setTools() {
    console.log("ok");
  }
}

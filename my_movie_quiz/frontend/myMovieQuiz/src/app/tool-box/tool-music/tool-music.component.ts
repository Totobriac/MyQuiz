import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Music } from 'src/app/interfaces/music';
import { MusicDataService } from 'src/app/services/music-data.service';
import { Howl } from 'howler'

@Component({
  selector: 'app-tool-music',
  templateUrl: './tool-music.component.html',
  styleUrls: ['./tool-music.component.css']
})
export class ToolMusicComponent implements OnInit {

  music: Music
  subscription: Subscription
  sound: any
  rate: number
  isPlaying: boolean = false
    
  
  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.subscription = this.musicDataService.currentMusic.subscribe(music => this.music = music)
  }

  play() {    
    var index = this.music.currentTrack
    if (index == 0) {
      this.sound = new Howl({
        src: [this.music.mainTitle.url],
        html5: true,
      })
    }
    else {
      this.sound = new Howl({
        src: [this.music.samples[index - 1].url],
        html5: true,
      })
    }
    this.sound.play();
    index == 0 ? this.sound.rate(this.music.mainTitle.rate) : this.sound.rate(this.music.samples[index - 1].rate,);
    this.isPlaying = true;
    this.sound.on('end', () => { this.isPlaying = false });
  }

  stop() {
    this.sound.stop();
    this.isPlaying = false;
  }

  delete() {
    var index = this.music.currentTrack - 1;
    var samples = this.music.samples;
    samples.splice(index, 1)
    this.musicDataService.changeSamples(samples)
  }  

  changeRate(rate) {
    if (this.music.currentTrack == 0) {
      var mainTitle = this.music.mainTitle;
      mainTitle.volume = rate;
      this.musicDataService.changeMainTitle(mainTitle)
    }
    else {
      var samples = this.music.samples;
      samples[this.music.currentTrack-1].volume = rate;
      this.musicDataService.changeSamples(samples)
    }
  }
} 

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Music } from 'src/app/interfaces/music';
import { MusicDataService } from 'src/app/services/music-data.service';
import { Howl } from 'howler'
import { MusicPlayerService } from 'src/app/quiz-editor/music-question/music-player.service';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { toolChange } from 'src/app/animations';

@Component({
  selector: 'app-tool-music',
  templateUrl: './tool-music.component.html',
  styleUrls: ['./tool-music.component.css'],
  animations: [ toolChange ]
})

export class ToolMusicComponent implements OnInit {

  music: Music;
  subscription: Subscription;
  sound: any;
  rate: number;
  isPlaying: boolean = false;
  showTool: boolean;
  toolColor: any;
  card: string;

  yFont: number = 0
  yBack: number = 0
  fontFirst: boolean = false;
  isHidden: boolean = true;

  constructor(private musicDataService: MusicDataService,
              private musicPlayer: MusicPlayerService,
              private movieData: MovieDataService,
              private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.subscription = this.musicDataService.currentMusic.subscribe(music => this.music = music)
    this.subscription = this.movieData.currentShowTool.subscribe(showTool => this.showTool = showTool)
    this.subscription = this.musicDataService.currentMusicCard.subscribe(card => this.card = card.card)
  }

  get style() {
    this.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

  play() {
    var index = this.music.currentTrack
    if (index == 0) {
      this.sound = new Howl({
        src: [this.music.mainTitle.url],
        html5: true,
        rate: this.music.mainTitle.rate
      })
    }
    else {
      this.sound = new Howl({
        src: [this.music.samples[index - 1].url],
        html5: true,
        rate: this.music.samples[index - 1].rate
      })
    }
    this.sound.play();
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
    if (this.music.currentTrack == undefined) this.music.currentTrack = 0

    if (this.music.currentTrack == 0) {
      this.sound.rate(rate)
      var mainTitle = this.music.mainTitle;
      mainTitle.rate = rate;
      this.musicDataService.changeMainTitle(mainTitle)
      this.musicPlayer.setRate(this.music.currentTrack, rate)
    }
    else {
      this.sound.rate(rate)
      var samples = this.music.samples;
      samples[this.music.currentTrack - 1].rate = rate;
      this.musicDataService.changeSamples(samples)
      this.musicPlayer.setRate(this.music.currentTrack, rate)
    }
  }

  showFont() {
    if (this.yBack == 0) {
      this.fontFirst = true;
      setTimeout(() => { this.isHidden = false }, 600);
    }
    else {
      this.yBack = -50
      this.yFont = -55
    }
  }

  showBack() {
    setTimeout(() => { this.isHidden = false }, 1000);
    this.fontFirst = false
    this.yBack = -50
    this.yFont = 60
  }
}

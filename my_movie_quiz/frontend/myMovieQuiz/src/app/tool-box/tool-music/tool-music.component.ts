import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Music } from 'src/app/interfaces/music';
import { MusicDataService } from 'src/app/services/music-data.service';
import { Howl } from 'howler'
import { MusicPlayerService } from 'src/app/quiz-editor/music-question/music-player.service';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-tool-music',
  templateUrl: './tool-music.component.html',
  styleUrls: ['./tool-music.component.css'],
  animations: [
    trigger('cardChange', [
      transition((fromState: string, toState: string) => toState != fromState, [
        animate(100, style({ transform: 'rotate(1deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' })),
        animate(100, style({ transform: 'rotate(-1deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' })),
        animate(100, style({ transform: 'rotate(1deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' }))
      ])
    ])
  ]

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
}

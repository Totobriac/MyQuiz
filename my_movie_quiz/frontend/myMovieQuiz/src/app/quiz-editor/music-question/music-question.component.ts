import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MusicQuestionService } from './music-question.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MusicDataService } from 'src/app/services/music-data.service';
import { Music } from 'src/app/interfaces/music';
import { Howl } from 'howler'
import { MusicPlayerService } from './music-player.service';


@Component({
  selector: 'app-music-question',
  templateUrl: './music-question.component.html',
  styleUrls: ['./music-question.component.css']
})
export class MusicQuestionComponent implements OnInit {

  showQuestion: boolean = true;
  isPlaying: boolean = false;
  mixing: boolean = false;
  movie: MovieDb;
  subscription: Subscription;
  albumsCover: any;
  urlSafe: SafeResourceUrl;
  url: string;
  value: any;
  themes: any;
  track: any;
  music: Music;
  samples: any;
  sampleIndex: number = 0;
  sound: any;  
  samplesList: object[] = []
  playing: boolean = false
  canPause: boolean = false


  constructor(private movieData: MovieDataService,
              private musicService: MusicQuestionService,
              public sanitizer: DomSanitizer,
              private musicDataService: MusicDataService,
              private musicPlayer: MusicPlayerService,) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.subscription = this.musicDataService.currentMusic.subscribe(music => this.music = music)
    this.findAlbums(this.movie.title, this.movie.year, this.movie.music_composer)
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  findAlbums(movieTitle, year, composer) {
    this.musicService.getAlbum(movieTitle, year, composer)
      .subscribe(r => { this.albumsCover = r })
  }

  retreiveData(url) {
    var splitUrl = url.split("/")
    this.getTracks(splitUrl[splitUrl.length -1], splitUrl[splitUrl.length -2] )
  }

  getTracks(musicId, type) {
    this.isPlaying = true
    this.musicService.getTracks(musicId, type)
      .subscribe(r => {
        this.themes = r;
        console.log(r);
      })
    var newType = type
    if (type == "track") {
      newType = "tracks"
    }
    this.url = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=600&height=350&color=EF5466&layout=&size=medium&type=" + newType + "&id=" + musicId + "&app_id=1";
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  trackChoice(track: number) {
    this.track = track - 1;
  }

  selectTrack() {
    if (this.track == undefined)  this.track = 0  
    var mainTitle = { 'title': this.themes[this.track]['title'], 'url': this.themes[this.track]['preview'], 'volume': 0.8, 'rate': 1, 'mute': false};
    this.musicDataService.changeMainTitle(mainTitle);
    this.musicDataService.isPaused(false);
    this.musicDataService.changeCurrent(0);
    this.musicDataService.position(0);
    this.mixing = true;
  }

  searchSample(sample) {
    console.log(this.music);
    this.musicService.getSample(sample['sampleSearch'])
      .subscribe(r => {this.samples = r['results'];
                       this.sound = new Howl({
                         src: [this.samples[0]["previews"]["preview-lq-mp3"]],
                         html5: true,
                         loop: true,
                         })
                       this.sound.play()})
  }

  changeSample(next: number) {
    this.sound.stop();
    this.sound.unload();
    var index = this.sampleIndex + next
    if (index == this.samples.length) {
      index = 0
    } else if (index == -1) {
      index = this.samples.length - 1
    }
    this.sampleIndex = index
    this.sound = new Howl({
      src: [this.samples[this.sampleIndex]["previews"]["preview-lq-mp3"]],
      html5: true,
      loop: true,
    })
    this.sound.play()
    return (this.sampleIndex)
  }

  deleteSearch() {
    this.sound.stop()
    this.samples = undefined
    this.sampleIndex = 0
  }

  addToSamples() {
    this.samplesList.push({name: this.samples[this.sampleIndex]["name"],
                          themeDuration: this.samples[this.sampleIndex]["duration"],
                          duration: this.samples[this.sampleIndex]["duration"],
                          url: this.samples[this.sampleIndex]["previews"]["preview-hq-mp3"],
                          start: 0,
                          volume: 0.6,
                          rate: 1,
                          position: 0,
                          mute:false})
    this.musicDataService.changeSamples(this.samplesList)
  }

  play() {
    this.musicDataService.isPaused(true)
    this.musicPlayer.play(this.music)
  }

  pause() {
    this.musicDataService.isPaused(false)
    this.musicPlayer.pause()
  }

  stop() {
    this.musicDataService.isPaused(false)
    this.musicPlayer.stop()
  }

  forward(sec: number) {
    this.musicPlayer.forward(sec, this.music)
  }

  record() {
    this.musicService.record(this.music)
    .subscribe(r => console.log(r))
  }
}
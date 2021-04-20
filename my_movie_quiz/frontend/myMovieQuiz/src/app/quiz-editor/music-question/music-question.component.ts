import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MusicQuestionService } from './music-question.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MusicDataService } from 'src/app/services/music-data.service';
import { Music } from 'src/app/interfaces/music';
import { Howl } from 'howler'


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


  constructor(private movieData: MovieDataService,
              private musicService: MusicQuestionService,
              public sanitizer: DomSanitizer,
              private musicDataService: MusicDataService) { }

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
      .subscribe(r => { this.themes = r;
                        console.log(r); })
    var newType = type
    if (type == "track") {
      newType = "tracks"
    }
    this.url = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=600&height=350&color=EF5466&layout=&size=medium&type=" + newType + "&id=" + musicId + "&app_id=1";
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  trackChoice(track: number) {
    this.track = track;
  }

  selectTrack() {
    var mainTitle = {'title': this.themes[this.track]['title'], 'url':this.themes[this.track]['preview']};
    this.musicDataService.changeMainTitle(mainTitle);
    this.mixing = true;
  }

  searchSample(sample) {
    this.musicService.getSample(sample['sampleSearch'])
      .subscribe(r => {this.samples = r['results']})
  }

  changeSample(next: number) {
    if(this.sound != undefined){
      this.sound.stop()};
    var index = this.sampleIndex + next
    if (index == this.samples.length) {
      index = 0
    } else if (index == -1) {
      index = this.samples.length - 1
    }
    this.sampleIndex = index
    this.sound = new Howl({
      src: [this.samples[this.sampleIndex]["previews"]["preview-lq-mp3"]],
      html5 :true,
    })
    this.sound.play()
    return (this.sampleIndex)
  }
}

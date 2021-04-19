import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MusicQuestionService } from './music-question.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-music-question',
  templateUrl: './music-question.component.html',
  styleUrls: ['./music-question.component.css']
})
export class MusicQuestionComponent implements OnInit {

  showQuestion: boolean = true
  isPlaying: boolean = false
  movie: MovieDb;
  subscription: Subscription;
  albumsCover: any
  urlSafe: SafeResourceUrl;
  url: string
  value: any
  themes: any

  constructor(private movieData: MovieDataService,
              private musicService: MusicQuestionService,
              public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.findAlbums(this.movie.title, this.movie.year, this.movie.music_composer)
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  findAlbums(movieTitle, year, composer) {
    this.musicService.getAlbum(movieTitle, year, composer)
      .subscribe(r => { this.albumsCover = r;
                        console.log() })
  }

  retreiveData(url) {
    var splitUrl = url.split("/")
    this.getTracks(splitUrl[splitUrl.length -1], splitUrl[splitUrl.length -2] )
  }

  getTracks(musicId, type) {
    this.isPlaying = true
    this.musicService.getTracks(musicId, type)
      .subscribe(r => { this.themes = r })
    var newType = type
    if (type == "track") {
      newType = "tracks"
    }
    this.url = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=600&height=350&color=EF5466&layout=&size=medium&type=" + newType + "&id=" + musicId + "&app_id=1";
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}

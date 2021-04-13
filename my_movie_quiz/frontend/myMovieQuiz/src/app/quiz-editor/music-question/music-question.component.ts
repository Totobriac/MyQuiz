import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { MusicQuestionService } from './music-question.service';

@Component({
  selector: 'app-music-question',
  templateUrl: './music-question.component.html',
  styleUrls: ['./music-question.component.css']
})
export class MusicQuestionComponent implements OnInit {

  showQuestion = true
  movie: MovieDb;
  subscription: Subscription;
  albumsCover: any


  constructor(private movieData: MovieDataService,
              private musicService: MusicQuestionService) { }

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.findAlbums(this.movie.title, this.movie.year, this.movie.music_composer)
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  findAlbums(movieTitle, year, composer) {
    this.musicService.getAlbum(movieTitle, year, composer)
      .subscribe(r => { this.albumsCover = r})
  }

  getTracks(musicId) {
    this.musicService.getTracks(musicId)
      .subscribe(r => { console.log(r)})
  }

}

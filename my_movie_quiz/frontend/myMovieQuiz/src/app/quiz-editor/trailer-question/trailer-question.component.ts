import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { TrailerQuestionService } from './trailer-question.service';


@Component({
  selector: 'app-trailer-question',
  templateUrl: './trailer-question.component.html',
  styleUrls: ['./trailer-question.component.css']
})

export class TrailerQuestionComponent implements OnInit {

  movie: MovieDb
  subscription: Subscription;
  screenshotTaken: boolean = false
  screenshotUrls: any
  aspectRatio = true;
  videoSrcId: number

  apiLoaded = false;
  YT: any;
  video: any;
  player: any;
  reframed: boolean = false;
    
  constructor( private movieData: MovieDataService,
               private scrapService: TrailerQuestionService) { }

  ngOnInit() {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.video = movie.trailer)

    if (!this.apiLoaded) {
      console.log("loaded");
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
      window['onYouTubeIframeAPIReady'] = () => this.startVideo();
    }
    this.scrapService.retreiveSrc(this.video)
    .subscribe(r => {console.log(r);
                     this.videoSrcId = r['id']})
  }

  startVideo(){
    this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.video,
        playerVars: {
          'cc_load_policy': 0,
          'autoplay': 0,
          'modestbranding': 1,
          'controls': 2,
          'disablekb': 1,
          'rel': 0,
          'showinfo': 0,
          'fs': 0,
          'playsinline': 1,
        },        
      });
  }

  takeScreenshot() {
    var time = this.player.getCurrentTime()
    var milSeconds = (time%1).toString().split(".")[1]
    var timeStamp = new Date(time * 1000).toISOString().substr(11, 8)
    var fullTimeStamp = timeStamp + "." + milSeconds
    console.log(this.videoSrcId, fullTimeStamp);
    this.scrapService.takeScreenShot(this.videoSrcId, fullTimeStamp)
    .subscribe(r => {console.log(r);
                    this.screenshotUrls = r;})
  }

  generateScrapBooks() {
    this.screenshotTaken = true
  }

  ngOnDestroy() {
    window['YT'] = null;
    if (this.player) {
      this.player.destroy();
    }
  }
}

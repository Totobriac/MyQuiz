import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { cardChange, flyingTool } from 'src/app/animations';
import { MovieDb } from 'src/app/interfaces/movie';
import { TrailerTools } from 'src/app/interfaces/trailerTools';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { TrailerToolsDataService } from 'src/app/services/trailerTools-data.service';
import { TrailerQuestionService } from './trailer-question.service';


@Component({
  selector: 'app-trailer-question',
  templateUrl: './trailer-question.component.html',
  styleUrls: ['./trailer-question.component.css'],
  animations: [ flyingTool, cardChange ]
})

export class TrailerQuestionComponent implements OnInit {

  movie: MovieDb;
  subscription: Subscription;
  screenshotTaken: boolean = false;
  previewPicUrl: object[] = [];
  previewGifUrl: object[] = [];
  gifDuration: number;

  apiLoaded: boolean = false;
  YT: any;
  video: any;
  player: any;
  reframed: boolean = false;
  tools: TrailerTools;
  picPosition: string = "relative";
  toolColor: string;
    
  constructor( private movieData: MovieDataService,
               private trailerToolsData: TrailerToolsDataService, 
               private trailerService: TrailerQuestionService,
               private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.subscription = this.trailerToolsData.currentTrailerTools.subscribe(tools => this.tools = tools)

    if (!this.apiLoaded) {
      console.log("loaded");
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
      window['onYouTubeIframeAPIReady'] = () => this.startVideo();
    }

    if (this.tools.videoSrcId == null) {
      this.trailerService.retreiveSrc(this.movie.trailer)
      .subscribe(r => {console.log(r);
                      this.trailerToolsData.changeVideoSrcId(r['id'])})
    }
  }

  startVideo(){
    this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.movie.trailer,
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

  getCurrentTime() {
    var time = this.player.getCurrentTime()
    var milSeconds = (time%1).toString().split(".")[1]
    var timeStamp = new Date(time * 1000).toISOString().substr(11, 8)
    return (timeStamp + "." + milSeconds)
  }
 
  takeScreenshot() {
    var fullTimeStamp = this.getCurrentTime()
    console.log(this.tools.videoSrcId, fullTimeStamp);
    this.trailerService.takeScreenShot(this.tools.videoSrcId, fullTimeStamp)
      .subscribe(r => {
        console.log(r);
        this.previewPicUrl.push({ url: r['url'] });
        this.trailerToolsData.addPreviewPic(this.previewPicUrl);
        this.movieData.changeShowTool(true);
      })
  }

  generateScrapBooks() {
    this.screenshotTaken = true;
    this.picPosition = "absolute";
    this.trailerToolsData.changeShooting(false)
  }

  takeGif() {
    if (this.gifDuration) {
      var fullTimeStamp = this.getCurrentTime();
      this.trailerService.createGif(this.tools.videoSrcId, fullTimeStamp, this.gifDuration)
      .subscribe(r => {
        console.log(r);
        this.previewPicUrl.push({ url: r['url'] });
        this.trailerToolsData.addPreviewPic(this.previewPicUrl);
        this.movieData.changeShowTool(true);
      })
    }
  }

  ngOnDestroy() {
    window['YT'] = null;
    if (this.player) {
      this.player.destroy();
    }
  }

  duration(time) {
    this.gifDuration = time;
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)' 
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }
}

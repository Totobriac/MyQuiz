import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { PosterTools } from 'src/app/interfaces/posterTools';
import { PosterToolsDataService } from 'src/app/services/posterTools-data.service';
import { cardChange, flyingTool } from 'src/app/animations';
import { imgEffects } from './effects'

@Component({
  selector: 'app-poster-question',
  templateUrl: './poster-question.component.html',
  styleUrls: ['./poster-question.component.css',
    './image-effects.css'],
  animations: [flyingTool, cardChange]
})
export class PosterQuestionComponent implements OnInit {

  blurring: any;
  color: any;
  rotation: any;
  back: any;
  effectIndex: number = 0
  imageEffectDisplay: string = 'No effect'
  imageEffect: string
  imgEffects: any = imgEffects
  tools: PosterTools
  movie: MovieDb
  subscription: Subscription
  toolColor: string;

  constructor(private sanitizer: DomSanitizer,
    private movieData: MovieDataService,
    private posterToolsData: PosterToolsDataService) { }


  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.posterToolsData.currentPosterTools.subscribe(tools => this.tools = tools);
    this.back = 'url(' + this.tools.posterSrc + ')';
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    this.back = 'url(' + this.tools.posterSrc + ')'
    return this.sanitizer.bypassSecurityTrustStyle(`--back: ${this.back}`);
  }

  onBlurChange(event: any) {
    let blurValue = event.value;
    this.blurring = "blur(" + blurValue + "px)"
  }

  onRotationChange() {
    this.rotation === "rotate(180deg)" ? this.rotation = "rotate(0deg)" : this.rotation = "rotate(180deg)"
  }

  changeEffect(next: number) {
    if (this.effectIndex + next == this.imgEffects.length) {
      this.effectIndex = 0
    }
    else if (this.effectIndex + next == -1) {
      this.effectIndex = this.imgEffects.length - 1
    }
    else { this.effectIndex = this.effectIndex + next }
    this.imageEffectDisplay = this.imgEffects[this.effectIndex]['display']
    this.imageEffect = this.imgEffects[this.effectIndex]['value']
  }

  crop() {
    this.posterToolsData.changeCrop(!this.tools.crop)
    console.log(this.tools.crop);
  }
}

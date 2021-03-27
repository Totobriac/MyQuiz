import { Component, Input, OnInit, } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { PosterTools } from 'src/app/interfaces/posterTools';
import { PosterToolsDataService } from 'src/app/services/posterTools-data.service';

@Component({
  selector: 'app-poster-question',
  templateUrl: './poster-question.component.html',
  styleUrls: ['./poster-question.component.css',
              './image-effects.css']
})
export class PosterQuestionComponent implements OnInit {

  blurring: any;
  color: any;
  rotation: any;
  back: any

  showQuestion = true;
  effectIndex: number = 0
  imgEffects = [{display:'No effect', value:''},
                {display:'Pencil', value:'pencil-effect'},
                {display:'Watercolor', value:'watercolor-effect'},
                {display:'Emboss', value:'emboss-effect'},
                {display:'Colored Pencil', value:'colored-pencil-effect'},
                {display:'Chalkboard', value:'chalkboard-effect'},
                {display:'Colored Chalk', value:'colored-chalkboard-effect'},
                {display:'Airbrush', value:'airbrush-effect'},
                {display:'Hallucination', value:'hallucination-effect'},
                {display:'Flannel', value:'flannel-effect'},
                {display:'Collage', value:'collage-effect'},
                {display:'Mosaic', value:'mosaic-effect'},
                {display:'Infrared', value:'infrared-effect'},
                {display:'Night Vision', value:'night-vision-effect'},
                {display:'Warhol', value:'warhol-effect'},
                {display:'Horizontal Mirror', value:'mirror-x-effect'},
                {display:'Vertical Mirror', value:'mirror-y-effect'}]
  imageEffectDisplay: string = 'No effect'
  imageEffect: string

  tools: PosterTools
  movie: MovieDb
  subscription: Subscription

  constructor(private sanitizer: DomSanitizer,
              private movieData: MovieDataService,
              private posterToolsData: PosterToolsDataService) {}


  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie)
    this.subscription = this.posterToolsData.currentPosterTools.subscribe(tools => this.tools = tools)
    this.back = 'url(' + this.tools.posterSrc + ')' 
  }

  get style() {
    this.back = 'url(' + this.tools.posterSrc + ')' 
    return this.sanitizer.bypassSecurityTrustStyle(`--back: ${this.back}`);
  }

  onBlurChange(event: any) {
    let blurValue= event.value;  
    this.blurring = "blur("+ blurValue +"px)"
  }

  onRotationChange() {
    this.rotation === "rotate(180deg)"? this.rotation = "rotate(0deg)" : this.rotation = "rotate(180deg)"    
  }

  onSelectedSection(value) {
    this.showQuestion = value
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

}

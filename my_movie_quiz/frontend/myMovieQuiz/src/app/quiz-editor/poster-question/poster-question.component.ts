import { Component, Input, OnInit, } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';

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

  movie: Movie
  subscription: Subscription

  constructor(private sanitizer: DomSanitizer,
              private data: MovieDataService) {}

  @Input() posterSrc;
  @Input() posterBack;

  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg" 

  ngOnInit(): void {
    this.subscription = this.data.currentMovie.subscribe(movie => this.movie = movie)
    this.back = 'url(' + this.posterSrc + ')' 
  }

  get style() {
    this.back = 'url(' + this.posterSrc + ')' 
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

  changeEffect(nOrP: number) {
    if (this.effectIndex + nOrP == this.imgEffects.length) {
      this.effectIndex = 0
    }
    else if (this.effectIndex + nOrP == -1) {
      this.effectIndex = this.imgEffects.length - 1
    }
    else { this.effectIndex = this.effectIndex + nOrP }
    this.imageEffectDisplay = this.imgEffects[this.effectIndex]['display']
    this.imageEffect = this.imgEffects[this.effectIndex]['value']
  }

}

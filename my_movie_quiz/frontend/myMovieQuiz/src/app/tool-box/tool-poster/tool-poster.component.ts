import { Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { ImageCroppedEvent,} from 'ngx-image-cropper';
import { ToolsService } from '../tools.service';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { PosterToolsDataService } from 'src/app/services/posterTools-data.service';
import { PosterTools } from 'src/app/interfaces/posterTools';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-tool-poster',
  templateUrl: './tool-poster.component.html',
  styleUrls: ['./tool-poster.component.css'],
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
export class ToolPosterComponent implements OnInit {

  
  urlToCrop: string;
  tools: PosterTools
  poster: any
  subscription: Subscription
  isHidden: boolean = true
  startAnm: boolean = false
  toolColor: string;

  constructor (private toolsService : ToolsService,
               private movieData: MovieDataService,
               private posterToolsData: PosterToolsDataService,
               private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.poster = movie.poster)
    this.subscription = this.posterToolsData.currentPosterTools.subscribe(tools => this.tools = tools)
    this.urlToCrop = "https://image.tmdb.org/t/p/w500" + this.poster
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)' 
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

  imageCropped(event: ImageCroppedEvent) {
    var croppedImage = event.base64;
    this.posterToolsData.changePosterSrc(croppedImage) 
  }

  imageLoaded() {    
    console.log('Image loaded');
  }

  selectTheme(theme: number) {
    this.toolsService.theme(theme)
    .subscribe((backgrounds) => {var back = backgrounds 
                                this.posterToolsData.changeTheme(back);
                                this.posterToolsData.changeBackground(back[0])})    
  }

  changeBackground(next: number) {
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.posterToolsData.changeBackground(this.tools.backgrounds[index])
  }

  changeBorder() {
    this.posterToolsData.changePalette("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.posterToolsData.changeBorder(border)
  }

  changeColor(tool: string) {
    this.posterToolsData.changePalette(tool)
  }

  showBack() {
    setTimeout(() => { this.isHidden = false}, 1000);
    this.startAnm = true;
  }

  getStyle(): object {
    var style
    this.tools.crop == true ? style={'top': '-191px'} : style={'top': '31px'}
    return style
  }
}

import { Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { ImageCroppedEvent,} from 'ngx-image-cropper';
import { ToolsService } from '../tools.service';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { PosterToolsDataService } from 'src/app/services/posterTools-data.service';
import { PosterTools } from 'src/app/interfaces/posterTools';

@Component({
  selector: 'app-tool-poster',
  templateUrl: './tool-poster.component.html',
  styleUrls: ['./tool-poster.component.css']
})
export class ToolPosterComponent implements OnInit {

  
  urlToCrop: string;
  cropping: boolean = true;
  selectedTools: string = "Background"
  tools: PosterTools
  poster: any
  subscription: Subscription

  constructor (private toolsService : ToolsService,
               private movieData: MovieDataService,
               private posterToolsData: PosterToolsDataService) {}

  ngOnInit(): void {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.poster = movie.poster)
    this.subscription = this.posterToolsData.currentPosterTools.subscribe(tools => this.tools = tools)
    this.urlToCrop = "https://image.tmdb.org/t/p/w500" + this.poster
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

  onChange() {    
    this.cropping = !this.cropping
    this.selectedTools == "Crop" ? this.selectedTools = "Background" : this.selectedTools = "Crop"
  }

  changeBorder() {
    this.posterToolsData.changePalette("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.posterToolsData.changeBorder(border)
  }

  changeColor(tool: string) {
    this.posterToolsData.changePalette(tool)
  }


}

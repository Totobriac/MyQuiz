import { Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { ImageCroppedEvent,} from 'ngx-image-cropper';
import { ToolsService } from '../tools.service';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tool-poster',
  templateUrl: './tool-poster.component.html',
  styleUrls: ['./tool-poster.component.css']
})
export class ToolPosterComponent implements OnInit {

  @Input() component: number;
  @Input() posterListIndex: any;
  @Input() posterThemeOption: number;


  @Output() posterSrc = new EventEmitter();
  @Output() picBack = new EventEmitter();
  @Output() selectedOption = new EventEmitter();
  @Output() backListIndex = new EventEmitter();

  croppedImage: any = '';
  urlToCrop: string;
  cropping: boolean = true;
  selectedTools: string = "Background"
  backgrounds: any;

  poster: any
  subscription: Subscription

  constructor (private toolsService : ToolsService,
               private data: MovieDataService) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMovieDb.subscribe(movie => this.poster = movie.poster)
    this.urlToCrop = "https://image.tmdb.org/t/p/w500" + this.poster
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.posterSrc.emit(this.croppedImage) 
  }

  imageLoaded() {    
    console.log('Image loaded');
  }

  changeBackground (next) {

  }

  selectTheme (theme) {

  }

  onChange() {    
    this.cropping = !this.cropping
    this.selectedTools == "Crop" ? this.selectedTools = "Background" : this.selectedTools = "Crop"
  }

}

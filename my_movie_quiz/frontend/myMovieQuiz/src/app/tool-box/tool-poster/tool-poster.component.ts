import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Url } from 'url';

@Component({
  selector: 'app-tool-poster',
  templateUrl: './tool-poster.component.html',
  styleUrls: ['./tool-poster.component.css']
})
export class ToolPosterComponent implements OnInit {

  @Input() quizedMovie: any;

  @Output() posterSrc = new EventEmitter()

  croppedImage: any = '';
  urlToCrop: Url;

  constructor() { }

  ngOnInit(): void {
    this.urlToCrop = this.quizedMovie.poster
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.posterSrc.emit(this.croppedImage) 
  }

  imageLoaded() {    
    console.log('Image loaded');
  }

}

import { Component, OnInit, Input, Output, EventEmitter,} from '@angular/core';
import { ImageCroppedEvent,} from 'ngx-image-cropper';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-tool-poster',
  templateUrl: './tool-poster.component.html',
  styleUrls: ['./tool-poster.component.css']
})
export class ToolPosterComponent implements OnInit {

  @Input() poster: string;
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

  constructor (private toolsService : ToolsService) {}

  ngOnInit(): void {
    this.urlToCrop = "https://image.tmdb.org/t/p/w500" + this.poster
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.posterSrc.emit(this.croppedImage) 
  }

  imageLoaded() {    
    console.log('Image loaded');
  }

  onChange() {    
    this.cropping = !this.cropping
    this.selectedTools == "Crop" ? this.selectedTools = "Background" : this.selectedTools = "Crop"
  }

  selectTheme(theme: number) {    
    this.toolsService.theme(theme)
    .subscribe((r) => {this.backgrounds = r
                      this.picBack.emit({question: this.component, value: this.backgrounds[0]})
                      this.selectedOption.emit({question: this.component, value: theme})
                      this.toolsService.setBackgrounds(this.component, this.backgrounds)})    
  }

  changeBackground(nOrP) {
    var backPic = this.toolsService.background(nOrP, this.component,  this.posterListIndex ? this.posterListIndex['index'] : 0)
    console.log(this.posterListIndex);
    this.picBack.emit({question: this.component, value: backPic['backgrounds']})
    this.backListIndex.emit({question: this.component, index: backPic['index']})
  }
}

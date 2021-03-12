import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.css']
})
export class QuizEditorComponent implements OnInit {

  @Input() quizedMovie;
  @Input() component: number;
  @Input() trailer: string;
  @Input() backdrop: string;

  @Input() plotFS: number;
  @Input() changeColor: object;

  @Input() plotFF: string;
  @Input() actFF: string;

  @Input() plotBack: string;
  @Input() actBack: object;

  @Input() plotOpacity: number;
  @Input() actorOpacity: number;

  @Input() plotCorn: string;
  @Input() actCorn: string;

  @Input() isBold: object;

  @Input() actorBorder: string;
  @Input() plotBorder: string;

  @Input() display: string;

  @Input() posterSrc: any;

  videoSource: any

  plotBackColor: string
  actorBackColor: string

  plotFontColor: any
  actorFontColor: any

  plotBorderColor: any
  actorBorderColor: any

  actorPicUrl: any
  oldId: any

  imgClassSaved: boolean[]
  pixelValueSaved: number[]

  src: any[]
  photoIndexSaved: any[];
  
  constructor() { }  

  ngOnInit(): void {  
  }

  setPlotBackColor(color) {
    this.plotBackColor = color
  }

  setActorBackColor(color) {
    this.actorBackColor = color
  }

  setPlotFontColor(color) {    
    this.plotFontColor = color
  }

  setActorFontColor(color) {    
    this.actorFontColor = color
  }

  setPlotBorderColor(color) {
    this.plotBorderColor = color
  }

  setActorBorderColor(color) {
    this.actorBorderColor = color
  }

  savePicUrl(picUrl) {
    this.actorPicUrl = picUrl
  }

  saveId(id) {
    this.oldId = id
  }

  saveImgClass(imgClass) {
    this.imgClassSaved = imgClass
  }

  savePixelValue(pixelValue) {
    this.pixelValueSaved = pixelValue
  }

  saveSrc(src) {
    this.src = src
  }

  savePhotoIndex(photoIndex) {
    this.photoIndexSaved = photoIndex
  }
}

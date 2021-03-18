import { Component, Input,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.css']
})
export class QuizEditorComponent implements OnInit {

  @Input() trailer: string;
  @Input() backdrop: string;


  actorPicUrl: any
  oldId: any

  imgClassSaved: boolean[]
  pixelValueSaved: number[]

  src: any[]
  photoIndexSaved: any[];

  component: number
  subscription: Subscription
  
  constructor(private data: MovieDataService) { }  

  ngOnInit(): void {
    this.subscription = this.data.currentComponent.subscribe(component => this.component = component)
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

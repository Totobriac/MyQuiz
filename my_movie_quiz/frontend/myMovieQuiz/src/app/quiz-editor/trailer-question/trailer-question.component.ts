import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TrailerSearchService } from './trailer-search.service'

@Component({
  selector: 'app-trailer-question',
  templateUrl: './trailer-question.component.html',
  styleUrls: ['./trailer-question.component.css']
})

export class TrailerQuestionComponent implements OnInit {

  @Input() quizedMovie;
  @Input() videoSource

  isTrailer = false
  imageSource: any
  imgSrc: any
  gifPictures: any[] = []
    
  constructor(private trailerSearchService: TrailerSearchService) { }

  ngOnInit() {
  }

  drawPicture () {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d"); 
    canvas.width = 480;
    canvas.height = 360;
    const vid = document.getElementById("trailer") as HTMLVideoElement
    ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
    var img = new Image(); 
    img.setAttribute('crossOrigin', 'anonymous');
    this.imgSrc = canvas.toDataURL()
    return this.imgSrc
  }

  takeScreenshot() {
    this.drawPicture()
    this.imageSource= this.imgSrc  
  }

  getTrailer() {
    console.log(this.quizedMovie.trailer.id)
    this.trailerSearchService.getTrailer(this.quizedMovie.trailer.id)
      .subscribe(r=> { this.videoSource = r})
  }

  createGif() {
    var counter = 1
    setInterval(() => { while (counter < 20) {this.drawPicture()
                                              this.gifPictures.push(this.imgSrc)                                          
                                              counter ++ }}, 300)
    console.log(this.gifPictures.length)
    // var currentFrame = 0;
    // function changePicture() {
    //   this.imageSource = this.gifPictures[currentFrame]; 
    //   currentFrame++; 
    //   if(currentFrame >= this.gifPictures.length){
    //     currentFrame = 0;}
    // }

    // setInterval(changePicture,100);

  }
    
}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class PixelActor {

  img: HTMLImageElement 
  originalImg: HTMLImageElement
  pixelatedPics: any[] = []
 

  pixelate(selectAct, selectedPic) {
    var index = 1
    this.pixelatedPics = []
    this.img = document.getElementById(selectAct) as HTMLImageElement;
    this.originalImg = this.img
    this.pixelatedPics.push({'picIndex': selectedPic.index, 'index': 0, 'src': this.img.src})

    for (var i = 2; i <= 10; i += 2) {
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      canvas.height = this.originalImg.height / i;
      canvas.width = this.originalImg.width / i;
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      var target = new Image();
      target.src = canvas.toDataURL()
      this.pixelatedPics.push({'picIndex': selectedPic.index, 'index': index, 'src': target.src})
      index += 1
    }
    return(this.pixelatedPics)
  } 
}
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class PixelActor {

  img: HTMLImageElement 
  originalImg: HTMLImageElement
  pixelatedPics: any[] = []

  pixelate(selectedActor) {
    this.pixelatedPics = []
    this.img = document.getElementById(selectedActor.toString()) as HTMLImageElement;
    console.log(this.img)
    this.originalImg = this.img
    this.pixelatedPics.push(this.img['src'])

    for (var i = 2; i <= 10; i += 2) {
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = this.originalImg.width / i;
      canvas.height = this.originalImg.height / i;
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      var target = new Image();
      target.src = canvas.toDataURL()
      this.pixelatedPics.push(target.src) 
    }
    return(this.pixelatedPics)
  } 
}
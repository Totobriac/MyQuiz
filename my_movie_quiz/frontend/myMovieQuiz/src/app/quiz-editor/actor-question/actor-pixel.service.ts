import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class PixelActor {

  img: HTMLImageElement 
  originalImg: HTMLImageElement 
  

  pixelate(selectedActor: number, value: number){
    if (value == 2) {
      this.img = document.getElementById(selectedActor.toString()) as HTMLImageElement;
      this.originalImg = this.img
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      canvas.width = this.originalImg.width / value;
      canvas.height = this.originalImg.height / value;
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      var target = new Image();
      target.src = canvas.toDataURL()
      return (target.src)    
    } else {
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);    
      canvas.width = this.originalImg.width / value;
      canvas.height = this.originalImg.height / value;
      ctx.drawImage(this.originalImg, 0, 0, canvas.width, canvas.height);
      var target = new Image();
      target.src = canvas.toDataURL()
      console.log(target.src)
      return (target.src)
    } 
  }
}
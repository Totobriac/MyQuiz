import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class PixelActor {

  img: HTMLImageElement
  
  pixelate(selectedActor, value){
    this.img = document.getElementById(selectedActor.toString()) as HTMLImageElement;    
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");   
    canvas.width = this.img.width / value;
    canvas.height = this.img.height / value;
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
    var target = new Image();
    target.src = canvas.toDataURL()
    return (target.src)    
  }
}
import { Injectable } from "@angular/core";
import { MovieDb } from "../interfaces/movie";
import { defer, fromEvent, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})

export class GetBackgoundColor {

  colors:any[] = [];

  getColorArray (movie: MovieDb): Observable<any> {
    return defer(() => {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = "https://www.themoviedb.org/t/p/w342/" + movie.poster;
      
      return fromEvent(img, 'load').pipe(
        map(() => {
          var canvas = <HTMLCanvasElement>document.getElementById("canvas");
          var ctx = canvas.getContext("2d");
          canvas.height = 10;
          canvas.width = 6;
          ctx.clearRect(0, 0, canvas.width, canvas.height); 
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          return imgData;
        })
      ); 
    })
  }  
}

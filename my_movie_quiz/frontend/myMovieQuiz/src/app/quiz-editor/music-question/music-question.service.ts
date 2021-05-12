import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Music } from 'src/app/interfaces/music';

@Injectable({
  providedIn: 'root'
})

export class MusicQuestionService {

  constructor(private http: HttpClient) {}

  getAlbum(movieName, year, composer) {
    return this.http.get("http://127.0.0.1:8000/api/album/" + movieName +"/"+ year +"/"+ composer)
  }

  getTracks(musicId, type) {
    return this.http.get("http://127.0.0.1:8000/api/tracks/" + musicId + "/" + type)
  }

  getSample(query) {
    return this.http.get("http://127.0.0.1:8000/api/sample/" + query )
  }

  record(music: Music) {
    var url: string[] = []
    var start: number[] = []
    var duration: string[] = []
    var rate: number[] = []
    var volume: number[] = []

    url.push(music.mainTitle.url);
    start.push(0);
    duration.push("00:00:30.000");
    rate.push(1);
    volume.push(music.mainTitle.volume);

    if (music.samples != undefined) {
      for (var sample of music.samples) {
        url.push(sample.url);
        start.push(sample.start*1000 * sample.rate);
        var totalDuration = sample.start + sample.duration;
        if (totalDuration >= 30) {
          duration.push("00:00:30.000");
        }
        else if (totalDuration < 10) {
          duration.push("00:00:0" + String(totalDuration));
        }
        else {
          duration.push("00:00:" + String(totalDuration));
        }
        rate.push(sample.rate);
        volume.push(sample.volume);
      }
      var data = {'url': url, 'start': start, 'duration': duration, 'rate': rate, 'volume': volume}
      return this.http.get("http://127.0.0.1:8000/api/record?json=" + encodeURIComponent(JSON.stringify(data)))
    }
  }
}

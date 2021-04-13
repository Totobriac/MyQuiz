import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrailerQuestionService {

  constructor(private http: HttpClient) {}

  retreiveSrc(video) {
    return this.http.get("http://127.0.0.1:8000/api/video_src/" + video)
  }

  takeScreenShot(videoSrcId, timeStamps) {
    return this.http.get("http://127.0.0.1:8000/api/scrapbook/" + videoSrcId + "/" + timeStamps)
  }

  createGif(videoSrcId, timeStamps, duration) {
    return this.http.get(("http://127.0.0.1:8000/api/gif/" + videoSrcId + "/" + timeStamps + "/" + duration))
  }
}

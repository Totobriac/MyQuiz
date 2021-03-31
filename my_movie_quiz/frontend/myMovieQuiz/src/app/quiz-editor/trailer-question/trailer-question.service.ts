import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrailerQuestionService {

  constructor(private http: HttpClient) { }

  createScrapBook(video, timeStamps) {
    return this.http.get("http://127.0.0.1:8000/api/scrapbook/" + video + "/" + timeStamps)
  }
}

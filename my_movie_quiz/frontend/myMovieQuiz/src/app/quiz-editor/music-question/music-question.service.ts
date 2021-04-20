import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService {

  constructor(private http: HttpClient) { }

  autoMovie(movie: string) {
    return this.http.get('http://127.0.0.1:8000/api/autocomplete/' + movie)
  }

  autoPeople(people: string) {
    return this.http.get('http://127.0.0.1:8000/api/peopleautocomplete/' + people)
  }

  discover() {
    return this.http.get('http://127.0.0.1:8000/api/discover')
  }
}

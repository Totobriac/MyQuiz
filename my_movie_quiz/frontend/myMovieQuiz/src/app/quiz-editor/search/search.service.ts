import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchMovies(movieId: number) {
    return this.http.get('http://127.0.0.1:8000/api/search_movies/' + movieId)
  }

  searchPerson(personId: number) {
    return this.http.get('http://127.0.0.1:8000/api/search_person/' + personId)
  }

}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})

export class SearchActor {

  constructor(private http: HttpClient) {    
  }
   
  searchActor(actors) {
    return this.http.get('http://127.0.0.1:8000/api/search_actors/' + actors)
  }
}

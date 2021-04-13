import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root"
})

export class SearchMovie {
  
  constructor(private http: HttpClient) { }
      
  getTrailer(title: string, year: number){
    return this.http.get('http://127.0.0.1:8000/api/search_trailer/' + title + "/" + year.toString())    
  }
}


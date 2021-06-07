import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  
  fonts: object[] = [{index: 0, value: "'Roboto', sans-serif", display: "Regular"},
                     {index: 1, value: "'Playfair Display', serif", display: "Clean"},
                     {index: 2, value: "'Butcherman', cursive", display: "Horror"},
                     {index: 3, value: "'Fascinate', cursive", display: "Cartoon"},
                     {index: 4, value: "'Lacquer', cursive", display: "Handwritten"},
                     {index: 5, value: "'Lobster', cursive", display: "Vintage"},
                     {index: 6, value: "'Astloch', cursive", display: "Medieval"},
                     {index: 7, value: "'Sevillana', cursive", display: "Romantic"},
                     {index: 8, value: "'Smokum', cursive", display: "Western"},
                     {index: 9, value: "'Stalinist One', cursive", display: "Futuristic"},]

  cornerStyles: object[] = [{index: 0, value:"0px"},
                            {index: 1, value:"20px"},
                            {index: 2, value: "2em 1em 4em / 0.5em 3em"}]

  borderStyles: object[] = [{index: 0, value: "0px"}, {index: 1, value: "solid"},
                            {index: 2, value: "dotted"}, {index: 3, value: "dashed"},
                            {index: 4, value: "double"}, {index: 5, value: "thick double"},
                            {index: 6, value: "1rem solid"}, {index: 7, value: "4mm ridge"},
                            {index: 8, value: "outset"}];

  constructor(private http: HttpClient) { }


  corner(index: number) {
    index == this.cornerStyles.length - 1 ? index = 0 : index ++
    return(this.cornerStyles[index])    
  }

  border(index: number) {
    index == this.borderStyles.length - 1 ? index = 0 : index ++
    return(this.borderStyles[index])    
  }

  family(index: number, next: number) {
    index = index + next
    if (index == this.fonts.length) {
      index = 0
    } else if (index == -1) {
      index = this.fonts.length - 1
    }
    return (this.fonts[index])
  } 
  
  theme(theme: number) {
    return this.http.get('http://127.0.0.1:8000/api/picturetag/' + theme + '/') 
  }
  
}

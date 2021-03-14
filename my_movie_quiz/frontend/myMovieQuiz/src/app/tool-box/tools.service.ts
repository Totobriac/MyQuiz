import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"


@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) { }

  backIndex: number = 0
  cssFonts: string[] = [ "'Roboto', sans-serif",
                        "'Playfair Display', serif",
                        "'Butcherman', cursive",
                        "'Fascinate', cursive",
                        "'Lacquer', cursive",
                        "'Lobster', cursive",
                        "'Astloch', cursive",
                        "'Sevillana', cursive",
                        "'Smokum', cursive",
                        "'Stalinist One', cursive",]
  fonts: string[] = ['Regular', 'Clean', 'Horror', 'Cartoon',
                      'Handwritten', 'Vintage', 'Medieval',
                      'Romantic', 'Western', 'Futuristic']
  cornerStyles: string[] = ["0px", "20px", "2em 1em 4em / 0.5em 3em"]
  backgroundsList = []

  changeFF(nOrP: number, index: number) {
    if (index + nOrP == this.cssFonts.length) {
      index = 0}
    else if (index + nOrP == -1) {
      index = this.cssFonts.length - 1}
    else { index = index + nOrP }
    return ({ cssFonts: this.cssFonts[index], fonts: this.fonts[index], index: index })
  }

  corner(cornIndex: number) {
    cornIndex == this.cornerStyles.length - 1 ? cornIndex = 0 : cornIndex ++
    return({index: cornIndex, value: this.cornerStyles[cornIndex]})    
  }


  theme(theme: number) {
    return this.http.get('http://127.0.0.1:8000/api/picturetag/' + theme + '/') 
  }

  background(nOrP: number, component, index) {
    index = index + nOrP
    if (index == this.backgroundsList[component].length) {
      index = 0}
    else if (index == -1) {
      index = this.backgroundsList[component].length-1}
    return({backgrounds: this.backgroundsList[component][index], index: index})
  }

  setBackgrounds(component, backgrounds) {
    this.backgroundsList[component] = backgrounds}
}

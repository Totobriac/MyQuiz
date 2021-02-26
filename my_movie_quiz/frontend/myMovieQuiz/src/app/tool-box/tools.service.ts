import { Injectable } from '@angular/core';
import { BackgroundPicService} from './background-pic.service'

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private backgroundPicService : BackgroundPicService) { }

  index: number = 0
  backIndex: number = 0
  cornerIndex: number = 0
  backgrounds: string[]
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

  changeFF(nextOrPrevious) {
    if(nextOrPrevious == 2) {
      if (this.index == this.cssFonts.length-1) {
        this.index = 0
        return({cssFonts: this.cssFonts[this.index], fonts: this.fonts[this.index]})} 
      else {this.index ++
        return({cssFonts: this.cssFonts[this.index], fonts: this.fonts[this.index]})}
    } 
    else { 
      if (this.index == 0) {
        this.index = this.cssFonts.length-1
        return({cssFonts: this.cssFonts[this.index], fonts: this.fonts[this.index]})}
      else {this.index --
        return({cssFonts: this.cssFonts[this.index], fonts: this.fonts[this.index]})}}
  }

  theme(theme: number) {
    this.backIndex = 0
    var tag = Number(theme) + 4
    this.backgroundPicService.getBackgrounds(tag)
    .subscribe((r:any) => { console.log(r)
                            this.backgrounds= r
                            return(this.backgrounds[this.backIndex])})
  }

  background(nOrP) {
    if(nOrP == 2) {
      if (this.backIndex == this.backgrounds.length-1) {
        this.backIndex = 0
        return(this.backgrounds[this.backIndex])}
      else {this.backIndex ++
           return(this.backgrounds[this.backIndex])}
    } else { 
      if (this.backIndex == 0) {
        this.backIndex = this.backgrounds.length-1
        return(this.backgrounds[this.backIndex])}
      else {this.backIndex --
        return(this.backgrounds[this.backIndex])}
    }
  }

  corner() {
    this.cornerIndex == this.cornerStyles.length - 1 ? this.cornerIndex = 0 : this.cornerIndex ++
    return(this.cornerStyles[this.cornerIndex])}
}

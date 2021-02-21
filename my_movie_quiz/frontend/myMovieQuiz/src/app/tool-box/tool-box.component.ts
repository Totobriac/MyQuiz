import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackgroundPicService } from './background-pic.service' 

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {  

  @Output() fontSize = new EventEmitter()
  @Output() changeColor = new EventEmitter()
  @Output() fontFamily = new EventEmitter()
  @Output() background = new EventEmitter()
  @Output() backOpacity = new EventEmitter()

  size: number = 20
  change: boolean = false
  fonts: string[] = ['Regular', 'Clean', 'Horror', 'Cartoon',
                    'Handwritten', 'Vintage', 'Medieval',
                    'Romantic', 'Western', 'Futuristic']

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

  tags: string[] = ['scary', 'abstract']
  index: number = 0
  backIndex: number = 0
  showFonts: boolean = false
  selectedTools: string ="Fonts"
  backgrounds: string[]
  backText: boolean = true
  fontOrBack: string

  ngOnInit(): void {   
  }

  constructor (private backgroundPicService : BackgroundPicService) {}

  changeFontSize(selectedSize) {    
    this.size= selectedSize.value
    this.fontSize.emit(this.size)
  }

  changeFontColor(fontOrBack) {
    this.change = !this.change    
    this.changeColor.emit({change: this.change, fontOrBack: fontOrBack})
  }

  changeFontFamily(nextOrPrevious) {
    if(nextOrPrevious == 2) {
      if (this.index == this.cssFonts.length-1) {
        this.index = 0
        this.fontFamily.emit(this.cssFonts[this.index])} 
      else {this.index ++
        this.fontFamily.emit(this.cssFonts[this.index])}
    } 
    else { 
      if (this.index == 0) {
        this.index = this.cssFonts.length-1
        this.fontFamily.emit(this.cssFonts[this.index])}
      else {this.index --
        this.fontFamily.emit(this.cssFonts[this.index])}}
  }

  onChange() {    
    this.showFonts = !this.showFonts    
    if (this.selectedTools == "Fonts") {
      this.selectedTools = "Background"
      this.changeColor.emit({change: false, fontOrBack: null})
    } else { this.selectedTools = "Fonts"
             this.changeColor.emit({change: false, fontOrBack: null})}
  }

  selectTheme(theme: number) {
    this.backIndex = 0
    var tag = Number(theme) + 4
    this.backgroundPicService.getBackgrounds(tag)
    .subscribe((r:any) => { console.log(r)
                            this.backgrounds= r
                            this.background.emit(this.backgrounds[this.backIndex])})
  }

  changeBackground(nextOrPrevious) {
    if(nextOrPrevious == 2) {
      if (this.backIndex == this.backgrounds.length-1) {
        this.backIndex = 0
        this.background.emit(this.backgrounds[this.backIndex])} 
      else {this.backIndex ++
        this.background.emit(this.backgrounds[this.backIndex])}
    } 
    else { 
      if (this.backIndex == 0) {
        this.backIndex = this.backgrounds.length-1
        this.background.emit(this.backgrounds[this.backIndex])}
      else {this.backIndex --
        this.background.emit(this.backgrounds[this.backIndex])}}
  }

  changeOpacity(opacity) {
    this.backOpacity.emit(opacity)
  }
}


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
  @Output() rounded = new EventEmitter()
  @Output() bold = new EventEmitter()
  @Output() border = new EventEmitter()

  size: number
  opacity: number
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

  borderStyles: string[] = ["none", "solid","dotted", "dashed",
                            "double", "thick double", "1rem solid",
                            "4mm ridge", "outset"]

  cornerStyles: string[] = ["none", "rounded", "handdrawn"]

  tags: string[] = ['scary', 'abstract']
  index: number = 0
  backIndex: number = 0
  showFonts: boolean = false
  selectedTools: string ="Fonts"
  backgrounds: string[]
  backText: boolean = true
  fontOrBack: string
  isRounded: boolean = false
  isTextBold: boolean = false
  borderIndex: number = 0
  cornerIndex: number = 0

  ngOnInit(): void {   
  }

  constructor (private backgroundPicService : BackgroundPicService) {}

  changeFontSize(selectedSize) {    
    this.size = selectedSize.value
    this.fontSize.emit(this.size)
  }

  changeTheColor(fontOrBackOrBorder) {
    this.change = !this.change    
    this.changeColor.emit({change: this.change, colorTool: fontOrBackOrBorder})
    console.log(this.change)
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
    this.change = false
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
    this.opacity = opacity['value']
    this.backOpacity.emit(opacity)
  }

  onChangeCorner() {
    this.cornerIndex == this.cornerStyles.length -  1 ? this.cornerIndex = 0 : this.cornerIndex ++
    this.rounded.emit(this.cornerStyles[this.cornerIndex])
  }

  isBold() {
    this.isTextBold = !this.isTextBold
    this.bold.emit(this.isTextBold)
  }

  changeBorder() {
    this.borderIndex == this.borderStyles.length -  1 ? this.borderIndex = 0 : this.borderIndex ++
    this.border.emit(this.borderStyles[this.borderIndex])
  }
  
}


import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-actor',
  templateUrl: './tool-actor.component.html',
  styleUrls: ['./tool-actor.component.css']
})
export class ToolActorComponent implements OnInit {

  @Input() component: number
  @Output() fontSize = new EventEmitter()
  @Output() changeColor = new EventEmitter()
  @Output() fontFamily = new EventEmitter()
  @Output() picBack = new EventEmitter()
  @Output() backOpacity = new EventEmitter()
  @Output() rounded = new EventEmitter()
  @Output() bold = new EventEmitter()
  @Output() border = new EventEmitter()

  size: number
  opacity: number
  change: boolean = false
  borderStyles: string[] = ["none", "solid","dotted", "dashed",
                            "double", "thick double", "1rem solid",
                            "4mm ridge", "outset"]
  tags: string[] = ['scary', 'abstract']
  backIndex: number = 0
  showFonts: boolean = false
  selectedTools: string ="Fonts"
  fontOrBack: string
  isTextBold: boolean = false
  borderIndex: number = 0
  fontDisplay: string = "regular"

  ngOnInit(): void {   
  }

  constructor (private toolsService : ToolsService) {}

  changeFontSize(selectedSize) {    
    this.size = selectedSize.value
    this.fontSize.emit(this.size)
  }

  changeTheColor(fontOrBackOrBorder) {
    this.change = !this.change    
    this.changeColor.emit({change: this.change, colorTool: fontOrBackOrBorder})
  }

  changeFontFamily(nextOrPrevious) {
    var fontFamily = this.toolsService.changeFF(nextOrPrevious)
    this.fontDisplay = fontFamily['fonts']
    this.fontFamily.emit({question: this.component, value:fontFamily['cssFonts']})
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
    var selectedTheme = this.toolsService.theme(theme)
    this.picBack.emit({question: this.component, value: selectedTheme})
  }

  changeBackground(nOrP) {   
    var backPic = this.toolsService.background(nOrP)
    this.picBack.emit({question: this.component, value: backPic})
  }

  changeOpacity(opacity) {
    this.opacity = opacity['value']
    this.backOpacity.emit(opacity)
  }

  onChangeCorner() {
    var corner = this.toolsService.corner()
    this.rounded.emit({question: this.component, value: corner})
  }

  isBold() {
    this.isTextBold = !this.isTextBold
    this.bold.emit({question: this.component, value:this.isTextBold})
  }

  changeBorder() {
    this.borderIndex == this.borderStyles.length -  1 ? this.borderIndex = 0 : this.borderIndex ++
    this.border.emit(this.borderStyles[this.borderIndex])
  }
}

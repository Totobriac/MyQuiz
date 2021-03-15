import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-actor',
  templateUrl: './tool-actor.component.html',
  styleUrls: ['./tool-actor.component.css']
})
export class ToolActorComponent implements OnInit {

  @Input() component: number;
  @Input() actFontFamily: string;
  @Input() actCornIndex: number;
  @Input() actorThemeOption: number;
  @Input() actorListIndex: object;
  @Input() actorOpacity: number;
  @Input() actorBorderIndex: number;

  @Output() fontSize = new EventEmitter();
  @Output() changeColor = new EventEmitter();
  @Output() fontDisplay = new EventEmitter();
  @Output() fontFamily = new EventEmitter();
  @Output() picBack = new EventEmitter();
  @Output() backOpacity = new EventEmitter();
  @Output() rounded = new EventEmitter();
  @Output() bold = new EventEmitter();
  @Output() border = new EventEmitter();
  @Output() selectedOption = new EventEmitter();
  @Output() backListIndex = new EventEmitter();
  @Output() nameDisplay = new EventEmitter();

  size: number;
  opacity: number;
  change: boolean = false;
  borderStyles: string[] = ["none", "solid","dotted", "dashed",
                            "double", "thick double", "outset"];
  tags: string[] = ['scary', 'abstract'];
  backIndex: number = 0;
  showFonts: boolean = false;
  selectedTools: string ="Names";
  fontOrBack: string;
  isTextBold: boolean = false;
  borderIndex: number
  backgrounds: any;
 

  ngOnInit(): void {   
  }

  constructor (private toolsService : ToolsService) {}

  changeFontSize(selectedSize) {    
    this.size = selectedSize.value
    this.fontSize.emit(this.size)
  }

  changeTheColor(fBb) {
    this.change = !this.change    
    this.changeColor.emit({change: this.change, colorTool: fBb})
  }

  changeFontFamily(nOrP) {
    var fontFamily = this.toolsService.changeFF(nOrP,  this.actFontFamily ? this.actFontFamily['index'] : 0)
    this.fontFamily.emit({question: this.component, value:fontFamily['cssFonts'],
                          displayValue: fontFamily['fonts'], index: fontFamily['index']})
  } 

  onChange() {    
    this.showFonts = !this.showFonts
    this.change = false
    if (this.selectedTools == "Names") {
       this.selectedTools = "Background"
       this.changeColor.emit({change: false, fontOrBack: null})
    } else { this.selectedTools = "Names"
             this.changeColor.emit({change: false, fontOrBack: null})}
  }

  selectTheme(theme: number) {
    this.selectedOption.emit({question: this.component, value: theme}) 
    this.toolsService.theme(theme)
    .subscribe((r) => {this.backgrounds = r
                      this.picBack.emit({question: this.component, value: this.backgrounds[0]})
                      this.selectedOption.emit({question: this.component, value: theme})
                      this.toolsService.setBackgrounds(this.component, this.backgrounds)})
  }

  changeBackground(nOrP) {   
    var backPic = this.toolsService.background(nOrP, this.component, this.actorListIndex ? this.actorListIndex['index'] : 0)
    this.picBack.emit({question: this.component, value: backPic['backgrounds']})
    this.backListIndex.emit({question: this.component, index: backPic['index']})
  }

  changeOpacity(opacity) {
    this.opacity = opacity['value']
    this.backOpacity.emit({question: this.component, value: opacity})
  }

  onChangeCorner() {
    var corner = this.toolsService.corner(this.actCornIndex ? this.actCornIndex: 0)
    this.rounded.emit({question: this.component, value: corner['value'], index: corner['index']})
  }

  isBold() {
    this.isTextBold = !this.isTextBold
    this.bold.emit({question: this.component, value:this.isTextBold})
  }

  changeBorder() {
    this.actorBorderIndex == undefined ? this.borderIndex = 0 : this.borderIndex = this.actorBorderIndex
    this.borderIndex == this.borderStyles.length -  1 ? this.borderIndex = 0 : this.borderIndex ++
    this.border.emit({question: this.component, value: this.borderStyles[this.borderIndex], index: this.borderIndex})
  }

  selectDisplay(display) {
    console.log(display)
    this.nameDisplay.emit(display)
  }
}

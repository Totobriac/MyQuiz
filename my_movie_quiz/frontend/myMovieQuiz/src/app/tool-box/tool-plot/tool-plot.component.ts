import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-plot',
  templateUrl: './tool-plot.component.html',
  styleUrls: ['./tool-plot.component.css']
})
export class ToolPlotComponent implements OnInit {

  @Input() component : number;
  @Input() plotFontFamily: object;  
  @Input() plotCornIndex: number;
  @Input() plotThemeOption: number;
  @Input() plotListIndex: object;
  @Input() plotFontSize: number;
  @Input() plotOpacity: number;
  @Input() plotBorderIndex: number;

  @Output() fontSize = new EventEmitter();
  @Output() changeColor = new EventEmitter();
  @Output() fontFamily = new EventEmitter();
  @Output() picBack = new EventEmitter();
  @Output() backOpacity = new EventEmitter();
  @Output() rounded = new EventEmitter();
  @Output() bold = new EventEmitter();
  @Output() border = new EventEmitter();
  @Output() selectedOption = new EventEmitter();
  @Output() backListIndex = new EventEmitter();

  opacity: number;
  change: boolean = false; 
  borderStyles: string[] = ["none", "solid","dotted", "dashed",
                            "double", "thick double", "1rem solid",
                            "4mm ridge", "outset"];
  backIndex: number = 0;
  showFonts: boolean = false;
  selectedTools: string ="Fonts";
  fontOrBack: string;
  isTextBold: boolean = false;
  borderIndex: number;
  backgrounds: any; 
  

  ngOnInit(): void {    
  }

  constructor (private toolsService : ToolsService) {}

  onChangeCorner() {
    var corner = this.toolsService.corner(this.plotCornIndex ? this.plotCornIndex: 0)
    this.rounded.emit({question: this.component, value: corner['value'], index: corner['index']})
  }

  changeBorder() {
    this.plotBorderIndex == undefined ? this.borderIndex = 0 : this.borderIndex = this.plotBorderIndex
    this.borderIndex == this.borderStyles.length -  1 ? this.borderIndex = 0 : this.borderIndex ++
    this.border.emit({question: this.component, value: this.borderStyles[this.borderIndex], index: this.borderIndex})
  }

  changeFontSize(selectedSize) {    
    this.fontSize.emit({question: this.component, value: selectedSize})
  }

  changeTheColor(fontOrBackOrBorder) {
    this.change = !this.change    
    this.changeColor.emit({change: this.change, colorTool: fontOrBackOrBorder})
  }

  changeFontFamily(nOrP) {
    var fontFamily = this.toolsService.changeFF(nOrP, this.plotFontFamily ? this.plotFontFamily['index'] : 0)
    this.fontFamily.emit({question: this.component,
                          value:fontFamily['cssFonts'],
                          displayValue: fontFamily['fonts'],
                          index: fontFamily['index']})
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

  changeOpacity(opacity) {
    this.opacity = opacity['value']
    this.backOpacity.emit({question: this.component, value: opacity})
  }  

  isBold() {
    this.isTextBold = !this.isTextBold
    this.bold.emit({question: this.component, value:this.isTextBold})
  }

  selectTheme(theme: number) {    
    this.toolsService.theme(theme)
    .subscribe((r) => {this.backgrounds = r
                      this.picBack.emit({question: this.component, value: this.backgrounds[0]})
                      this.selectedOption.emit({question: this.component, value: theme})
                      this.toolsService.setBackgrounds(this.component, this.backgrounds)})    
  }

  changeBackground(nOrP) {
    var backPic = this.toolsService.background(nOrP, this.component,  this.plotListIndex ? this.plotListIndex['index'] : 0)
    this.picBack.emit({question: this.component, value: backPic['backgrounds']})
    this.backListIndex.emit({question: this.component, index: backPic['index']})
  }
}

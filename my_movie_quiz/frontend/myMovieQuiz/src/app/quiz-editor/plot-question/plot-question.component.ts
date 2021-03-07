import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plot-question',
  templateUrl: './plot-question.component.html',
  styleUrls: ['./plot-question.component.css']
})
export class PlotQuestionComponent implements OnInit {
 
  @Input() quizedMovie;
  @Input() plotFS: number;
  @Input() changeColor: object;
  @Input() plotFF: string;
  @Input() plotBack: string;
  @Input() plotOpacity: number;
  @Input() plotCorn: string;
  @Input() isBold: object;
  @Input() plotBorder: string
  @Input() plotBackColor: any
  @Input() plotFontColor: any
  @Input() plotBorderColor: any

  @Output() setPlotBackColor= new EventEmitter
  @Output() setPlotFontColor= new EventEmitter
  @Output() setPlotBorderColor= new EventEmitter

  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg"   
  
  backTextColor: any
  fontColor: any
  borderColor: any
  showQuestion = true
  editable = "false"

  constructor() { }  

  ngOnInit(): void {
    this.changeColor ? this.changeColor['change']= false : null
  }

  ngOnChanges(changes) {
    this.plotBackColor == undefined ? this.plotBackColor = "255, 255, 255" : this.plotBackColor = this.plotBackColor
    this.backTextColor = "rgba(" + this.plotBackColor + "," + this.plotOpacity + ")"
  }  
  
  enableEdition() {    
    this.editable == "false" ?  this.editable = "true" : this.editable = "false"
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  shuffle() {
    this.quizedMovie.plot = this.quizedMovie.plot.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ').replace(".","") + "."
  }

  onSelectedFontColor(color) {
    this.plotFontColor = color    
    this.fontColor= "rgb(" + this.plotFontColor + ")"
    this.setPlotFontColor.emit(this.fontColor)      
  }

  onSelectedBackTextColor(color) {  
    this.plotBackColor = color
    this.setPlotBackColor.emit(color)
    this.backTextColor= "rgba(" + this.plotBackColor + "," + this.plotOpacity + ")"
  }

  onSelectedBorderColor(color) {
    this.plotBorderColor = color
    this.setPlotBorderColor.emit(color)
  }

  getWeight() {  
    if (this.isBold == undefined) {
      return("normal")}
    else if (this.isBold['question'] == 1 && this.isBold['value'] == true) {
      return("bold")}
    else if (this.isBold['question'] == 1 && this.isBold['value'] == false) {
      return("normal")}
  }

  getBorder() {
    var border: string
    this.plotBorder == undefined ? border='none' : border= this.plotBorder
    this.plotBorderColor == undefined ? border = border : border = border + ' rgb(' + this.plotBorderColor + ')'
    return border
  }
}

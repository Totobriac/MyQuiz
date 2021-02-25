import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot-question',
  templateUrl: './plot-question.component.html',
  styleUrls: ['./plot-question.component.css']
})
export class PlotQuestionComponent implements OnInit {

  constructor() { }  

  ngOnInit(): void {    
  }

  ngOnChanges(changes) {
    this.color == undefined ? this.color = "255, 255, 255" : this.color =  this.color
    this.backTextColor = "rgba(" + this.color + "," + this.backOpacity + ")"    
  }

  showQuestion = true
  editable = "false"
  @Input() quizedMovie;
  @Input() fontSize: number;
  @Input() changeColor: object;
  @Input() fontFamily: string;
  @Input() background: string;
  @Input() backOpacity: number;
  @Input() cornerStyle: string;
  @Input() isBold: boolean;
  @Input() borderStyle: string

  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/scary/pexels-onanini-750319.jpg"   
  fontColor: any
  backTextColor: any
  color: any
  borderColor: any
  
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
    this.fontColor= "rgb(" + color + ")"
  }

  onSelectedBackTextColor(color) {  
    this.color = color
    this.backTextColor = "rgba(" + color + ", 0.7)"
  }

  getRadius() {
    if (this.cornerStyle == "none" || this.cornerStyle == undefined) {
      return('0px')
    } else if (this.cornerStyle == "rounded") {
      return('20px')
    } else {return('2em 1em 4em / 0.5em 3em')}
  }

  getWeight() {
    var weight: string
    this.isBold == false || this.isBold == undefined ? weight='normal' : weight='bold'
    return weight
  }

  getBorder() {
    var border: string
    this.borderStyle == undefined ? border='none' : border= this.borderStyle
    this.borderColor == undefined ? border = border : border = border + ' rgb(' + this.borderColor + ')'
    return border
  }

  onSelectedBorderColor(color) {
    this.borderColor = color
  }
}

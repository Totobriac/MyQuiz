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

  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/scary/pexels-onanini-750319.jpg"   
  fontColor: any
  backTextColor: any
  color: any
  
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
}

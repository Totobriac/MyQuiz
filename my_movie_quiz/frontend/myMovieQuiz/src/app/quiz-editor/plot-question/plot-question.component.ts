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

  showQuestion = true
  editable = "false"
  @Input() quizedMovie;

  enableEdition() {
    if (this.editable == "false") {
      this.editable = "true"}
    else {this.editable = "false"}    
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  shuffle() {
    this.quizedMovie.plot = this.quizedMovie.plot.split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ').replace(".","") + "."
  }

}

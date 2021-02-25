import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() changeColor: object;
  @Output() fontColor = new EventEmitter()
  @Output() backTextColor = new EventEmitter()
  @Output() borderColor = new EventEmitter()

  colors = [ "0, 0, 0", "192, 192, 192", "255, 0, 0",
              "255, 255, 0", "0, 128, 0", "0, 255, 255",
              "128, 0, 128", "255, 0, 255", "0, 128, 128",
              "255, 255, 255"]

  
  newFontColor(color) {
    if (this.changeColor['colorTool'] == 'font') {
      this.fontColor.emit(color)
    } else if (this.changeColor['colorTool'] == 'back') {
      this.backTextColor.emit(color)
    } else if (this.changeColor['colorTool'] == 'border') {
      this.borderColor.emit(color)
    }
    }
}

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

  colors = [ "0, 0, 0", "160, 128, 96", "255, 160, 16",
              "160, 32, 255", "0, 32, 255", "96, 255, 128",
              "255, 224, 32", "255, 96, 208", "0, 192, 0"]

  
  newFontColor(color) {
    this.changeColor['fontOrBack'] == 'font' ? this.fontColor.emit(color) : this.backTextColor.emit(color)
    }
}

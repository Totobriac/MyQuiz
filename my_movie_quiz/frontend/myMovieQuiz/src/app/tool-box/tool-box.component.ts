import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {  

  ngOnInit(): void {   
  }

  @Input() component: number;

  @Output() fontSize = new EventEmitter()
  @Output() changeColor = new EventEmitter()
  @Output() fontFamily = new EventEmitter()
  @Output() plotBack = new EventEmitter()
  @Output() picBack = new EventEmitter()
  @Output() backOpacity = new EventEmitter()
  @Output() rounded = new EventEmitter()
  @Output() bold = new EventEmitter()
  @Output() border = new EventEmitter()

  selectedFontSize(size) {
    this.fontSize.emit(size)}

  changeFontColor(color) {
    this.changeColor.emit(color)}

  changeFontFamily(family) {
    this.fontFamily.emit(family)}

  changePlotBack(back) {
    this.plotBack.emit(back)}

  changePicBack(back) {
    this.picBack.emit(back)}

  setBackOpacity(opacity) {
    this.backOpacity.emit(opacity)}

  setCornerStyle(style) {
    this.rounded.emit(style)}

  isTextBold(weight) {
    this.bold.emit(weight)}

  whichBorder(border) {
    this.border.emit(border)}
}


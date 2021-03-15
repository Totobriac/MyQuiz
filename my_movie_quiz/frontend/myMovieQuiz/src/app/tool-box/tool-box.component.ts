import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {  

  ngOnInit(): void {   
  }

  plotFontFamily: object;
  plotFontSize: object;

  actFontFamily: object;

  plotOpacity: number;
  actorOpacity: number

  plotCornIndex: number;
  actCornIndex: number;

  plotThemeOption: number;
  actorThemeOption: number;

  plotListIndex: object;
  actorListIndex: object;
  posterListIndex: object;

  plotBorderIndex: number;
  actorBorderIndex: number;
  
  @Input() component: number;
  @Input() quizedMovie: object;
  @Input() poster: string;

  @Output() fontSize = new EventEmitter()
  @Output() changeColor = new EventEmitter()
  @Output() fontFamily = new EventEmitter()
  @Output() plotBack = new EventEmitter()
  @Output() picBack = new EventEmitter()
  @Output() backOpacity = new EventEmitter()
  @Output() rounded = new EventEmitter()
  @Output() bold = new EventEmitter()
  @Output() border = new EventEmitter()
  @Output() nameDisplay = new EventEmitter()
  @Output() posterSrc = new EventEmitter()

  selectedFontSize(size) {
    console.log(size)
    if (size['question'] == 1) {
      this.plotFontSize = size['value']
    }
    this.fontSize.emit(size)}

  changeFontColor(color) {
    this.changeColor.emit(color)}

  changeFontFamily(family) {
    if (family['question']== 1) {
      this.plotFontFamily = {display: family['displayValue'], index: family['index']}
    }else if (family['question']== 2) {
      this.actFontFamily = {display: family['displayValue'], index: family['index']}
    }    
    this.fontFamily.emit(family)}

  changePlotBack(back) {
    this.plotBack.emit(back)}

  changePicBack(back) {
    this.picBack.emit(back)}

  setBackOpacity(opacity) {
    if (opacity['question'] == 1) {
      this.plotOpacity = opacity['value']
    } else if (opacity['question'] == 2) {
      this.actorOpacity = opacity['value']}
    this.backOpacity.emit(opacity)}

  setCornerStyle(style) {
    if (style['question'] == 1) {
      this.plotCornIndex = style['index']
    } else if (style['question'] == 2) {
      this.actCornIndex = style['index']}
    this.rounded.emit(style)}

  isTextBold(weight) {
    this.bold.emit(weight)}

  whichBorder(border) {
    if (border['question'] == 1) {
      this.plotBorderIndex = border['index']
    } else if (border['question'] == 2) {
      this.actorBorderIndex = border['index']}
    this.border.emit(border)}

  selectedOption(option) {
    if (option['question'] == 1) {
      this.plotThemeOption = option['value']
    } else if (option['question'] == 2) {
      this.actorThemeOption = option['value']}
  }

  selectedListIndex(listIndex) {
    console.log(listIndex)
    if (listIndex['question'] == 1) {
      this.plotListIndex = listIndex
    } else if (listIndex['question'] == 2) {
      this.actorListIndex = listIndex}
    else if (listIndex['question'] == 3) {
      this.posterListIndex = listIndex}
  }

  selectedDisplay(display) {
    console.log(display)
    this.nameDisplay.emit(display)
  }

  getPosterSrc(src) {
    this.posterSrc.emit(src)
  }
}

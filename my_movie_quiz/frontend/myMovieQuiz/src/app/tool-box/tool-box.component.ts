import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {  

  @Output() fontSize = new EventEmitter()
  @Output() changeColor = new EventEmitter()
  @Output() fontFamily = new EventEmitter()

  size: number = 20
  change: boolean = false
  fonts: string[] = ['Regular', 'Clean', 'Horror', 'Cartoon',
                    'Handwritten', 'Vintage', 'Medieval',
                    'Romantic', 'Western', 'Futuristic']

  cssFonts: string[] =[ "'Roboto', sans-serif",
                        "'Playfair Display', serif",
                        "'Butcherman', cursive",
                        "'Fascinate', cursive",
                        "'Lacquer', cursive",
                        "'Lobster', cursive",
                        "'Astloch', cursive",
                        "'Sevillana', cursive",
                        "'Smokum', cursive",
                        "'Stalinist One', cursive",]
  index= 0

  ngOnInit(): void {   
  }

  changeFontSize(selectedSize) {    
    this.size= selectedSize.value
    this.fontSize.emit(this.size)
  }

  changeFontColor() {
    this.change = !this.change
    this.changeColor.emit(this.change)
  }

  changeFontFamily(nextOrPrevious) {
    if(nextOrPrevious == 2) {
      if (this.index == this.cssFonts.length-1) {
        this.index = 0
        this.fontFamily.emit(this.cssFonts[this.index])} 
      else {this.index ++
        this.fontFamily.emit(this.cssFonts[this.index])}
    } 
    else { 
      if (this.index == 0) {
        this.index = this.cssFonts.length-1
        this.fontFamily.emit(this.cssFonts[this.index])}
      else {this.index --
        this.fontFamily.emit(this.cssFonts[this.index])}}
  }
}


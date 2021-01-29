import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-poster-question',
  templateUrl: './poster-question.component.html',
  styleUrls: ['./poster-question.component.css']
})
export class PosterQuestionComponent implements OnInit {

  @Input() quizedMovie;  

  ngOnInit(): void {
  }

  showQuestion = true;
  blurring: any;
  color: any;
  rotation: any;

  onBlurChange(event: any) {
    let blurValue= event.value;  
    this.blurring = "blur("+ blurValue +"px)"
  }

  onColorChange(event: any) {
    let colorValue= event.value;  
    this.color = "hue-rotate("+ colorValue +"deg)"
  }

  onRotationChange() {
    if (this.rotation === "rotate(180deg)") {
      this.rotation = "rotate(0deg)"
    } else {
      this.rotation = "rotate(180deg)"}    
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

}

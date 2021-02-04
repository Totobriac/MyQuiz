import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-qaswitch',
  templateUrl: './qaswitch.component.html',
  styleUrls: ['./qaswitch.component.css']
})
export class QASwitchComponent {

  @Output() setSection = new EventEmitter()
  showQuestion: boolean = true;
  selectedPage: string = "Answer"

  model:any

  onChange() {    
    this.showQuestion = !this.showQuestion
    this.setSection.emit(this.showQuestion)
    if (this.selectedPage == "Answer") {
      this.selectedPage = "Question"
    } else { this.selectedPage = "Answer"}
  } 
}

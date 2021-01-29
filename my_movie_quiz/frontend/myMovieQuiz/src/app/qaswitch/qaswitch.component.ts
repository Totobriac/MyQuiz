import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-qaswitch',
  templateUrl: './qaswitch.component.html',
  styleUrls: ['./qaswitch.component.css']
})
export class QASwitchComponent {

  @Output() setSection = new EventEmitter()
  showQuestion = true;

  model:any

  switchQA () {    
    this.showQuestion = !this.showQuestion
    this.setSection.emit(this.showQuestion)
  }
}

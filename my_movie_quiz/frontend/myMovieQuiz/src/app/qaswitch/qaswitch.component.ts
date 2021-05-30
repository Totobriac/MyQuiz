import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from '../services/movie-data.service';
import { PlotToolsDataService } from '../services/plotTools-data.service';

@Component({
  selector: 'app-qaswitch',
  templateUrl: './qaswitch.component.html',
  styleUrls: ['./qaswitch.component.css']
})
export class QASwitchComponent implements OnInit {

  @Output() setSection = new EventEmitter()
  showQuestion: boolean = true;
  selectedPage: string = "Answer";
  subscription: Subscription;
  component: number

  constructor(
    private movieData: MovieDataService,
    private plotTools: PlotToolsDataService ) {}

  ngOnInit() {
    this.subscription = this.movieData.currentComponent.subscribe(component => this.component = component)
  }

  toggle() {    
    this.showQuestion = !this.showQuestion
    this.setSection.emit(this.showQuestion)   
    if (this.selectedPage == "Answer") {
      this.selectedPage = "Question"
    } else { this.selectedPage = "Answer"}
    if (this.component == 1) {
      this.plotTools.changeCard(this.selectedPage)
    }
  }

  getBackColor() {
    var cl
    this.selectedPage == "Answer"? cl='answer-color' : cl='question-color'
    return cl
  }
}

import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css']
})
export class ToolBoxComponent implements OnInit {  

  @Output() nameDisplay = new EventEmitter()

  component: number
  subscription: Subscription

  constructor(private data: MovieDataService) {}

  ngOnInit(): void {
    this.subscription = this.data.currentComponent.subscribe(component => this.component = component)
  }

}

import { trigger, style, transition, animate } from '@angular/animations';
import { Component,  OnInit,} from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDataService } from '../services/movie-data.service';

@Component({
  selector: 'app-tool-box',
  templateUrl: './tool-box.component.html',
  styleUrls: ['./tool-box.component.css'],
  animations: [trigger('enterTrigger', [
    transition(':enter', [
      style({ opacity: '0' }),
      animate('1s linear', style({ opacity: '1' }))
    ]),
    transition(':leave', [
      style({ opacity: '1' }),
      animate('1s linear', style({ opacity: '0' }))
    ])]
  )]
})

export class ToolBoxComponent implements OnInit {

  tool: number
  subscription: Subscription

  constructor(private data: MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentTool.subscribe(tool => this.tool = tool)
  }
}

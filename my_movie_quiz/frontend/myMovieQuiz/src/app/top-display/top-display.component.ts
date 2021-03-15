import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-display',
  templateUrl: './top-display.component.html',
  styleUrls: ['./top-display.component.css']
})
export class TopDisplayComponent implements OnInit {

  @Input() backdrop: string
  @Input() component: number

  constructor() { }

  ngOnInit(): void {   
  }
}
  

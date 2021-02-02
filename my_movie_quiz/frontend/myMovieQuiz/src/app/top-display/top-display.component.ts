import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-display',
  templateUrl: './top-display.component.html',
  styleUrls: ['./top-display.component.css']
})
export class TopDisplayComponent implements OnInit {

  @Input() backdrop: string

  constructor() { }

  ngOnInit(): void {
  }

  // backdropUrl= "https://image.tmdb.org/t/p/w300" + this.backdrop

}

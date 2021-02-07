import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-curtain',
  templateUrl: './curtain.component.html',
  styleUrls: ['./curtain.component.css']
})
export class CurtainComponent implements OnInit {

  @Input() backdrop: string
 
  constructor() { }

  ngOnInit(): void {
  }
}

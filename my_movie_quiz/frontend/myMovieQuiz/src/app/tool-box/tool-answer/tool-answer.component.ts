import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';

@Component({
  selector: 'app-tool-answer',
  templateUrl: './tool-answer.component.html',
  styleUrls: ['./tool-answer.component.css'],
  animations: [
    trigger('cardChange', [
      transition((fromState: string, toState: string) => toState != fromState, [
        animate(100, style({ transform: 'rotate(1deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' })),
        animate(100, style({ transform: 'rotate(-1deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' })),
        animate(100, style({ transform: 'rotate(1deg)' })),
        animate(100, style({ transform: 'rotate(0deg)' }))
      ])
    ])
  ]
})
export class ToolAnswerComponent implements OnInit {

  subscription: Subscription;
  tools: PlotTools;
  isHidden: boolean = true;
  startAnm: boolean = false;
  toolColor: string;

  constructor(
    private plotToolsData: PlotToolsDataService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.subscription = this.plotToolsData.currentPlotTools.subscribe(tools => this.tools = tools)
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

  selectTheme(theme: number) {
    // this.toolsService.theme(theme)
    // .subscribe((backgrounds) => {var back = backgrounds 
    //                             this.posterToolsData.changeTheme(back);
    //                             this.posterToolsData.changeBackground(back[0])})    
  }

  changeBackground(next: number) {
  //   var index = this.tools.background.id + next
  //   if (index == this.tools.backgrounds.length) {
  //     index = 0
  //   } else if (index == -1) {
  //     index = this.tools.backgrounds.length - 1
  //   }
  //   this.posterToolsData.changeBackground(this.tools.backgrounds[index])
  }

  showBack() {
    setTimeout(() => { this.isHidden = false}, 1000);
    this.startAnm = true;
  }

}

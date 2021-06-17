import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/interfaces/answer';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { AnswerDataService } from 'src/app/services/answer-data.service';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';
import { ToolsService } from '../tools.service';

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
  isHidden: boolean = true;
  startAnm: boolean = false;
  toolColor: string;
  answer: Answer;

  constructor(
    private toolsService: ToolsService,
    private answerTools: AnswerDataService) { }


  ngOnInit(): void {
    this.subscription = this.answerTools.currentAnswerTools.subscribe(answer => this.answer = answer)
  }

  selectTheme(theme: number) {
    if (theme == 0) {
      this.answerTools.changeTheme(["empty"])      
    }
    else {
      this.toolsService.theme(theme)
        .subscribe((backgrounds) => {
          var back = backgrounds
          this.answerTools.changeTheme(back);
          this.answerTools.changeBackground(back[0])
        })
    }
  }

  changeBackground(next: number) {
    var index = this.answer.background.id + next
    if (index == this.answer.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.answer.backgrounds.length - 1
    }
    this.answerTools.changeBackground(this.answer.backgrounds[index])
  }

  showBack() {
    setTimeout(() => { this.isHidden = false }, 1000);
    this.startAnm = true;
  }
}

import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActorTools } from 'src/app/interfaces/actorTools';
import { ActorDataService } from 'src/app/services/actor-data.service';
import { ActorToolsDataService } from 'src/app/services/actorTools-data.service';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-actor',
  templateUrl: './tool-actor.component.html',
  styleUrls: ['./tool-actor.component.css'],
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
export class ToolActorComponent implements OnInit {

  tools: ActorTools
  subscription: Subscription
  yFont: number = 0
  yBack: number = 0
  fontFirst: boolean = false;
  isHidden: boolean = true;
  toolColor: string;


  constructor(private toolsService: ToolsService,
    private actorTool: ActorToolsDataService,
    private actorData: ActorDataService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subscription = this.actorTool.currentActorTools.subscribe(tools => this.tools = tools)
  }

  changeOpacity(selectedOpacity: number) {
    this.actorTool.changePalette("none")
    this.actorTool.changeOpacity(selectedOpacity);
  }

  onChangeCorner() {
    this.actorTool.changePalette("none")
    var corner = this.toolsService.corner(this.tools.corner.index)
    this.actorTool.changeCorner(corner)
  }

  changeBorder() {
    var border = this.toolsService.border(this.tools.border.index)
    this.actorTool.changeBorder(border)
  }

  changeFontFamily(next: number) {
    this.actorTool.changePalette("none")
    var family = this.toolsService.family(this.tools.fontFamily.index, next)   
    this.actorTool.changeFontFamily(family)
  }

  isBold() {
    this.actorTool.changePalette("none")
    var weight
    this.tools.weight == "normal" ? weight = "bold" : weight = "normal"
    this.actorTool.changeWeight(weight)
  }

  selectTheme(theme: number) {
    this.actorTool.changePalette("none")
    this.toolsService.theme(theme)
      .subscribe((backgrounds) => {
        var back = backgrounds
        this.actorTool.changeTheme(back);
        this.actorTool.changeBackground(back[0])
      })
  }

  changeBackground(next: number) {
    this.actorTool.changePalette("none")
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.actorTool.changeBackground(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.actorTool.changePalette(tool)
  }

  onChange() {
    this.actorTool.changePalette("none");
  }

  showBack() {
    setTimeout(() => { this.isHidden = false }, 1000);
    this.fontFirst = false
    this.yBack = -50
    this.yFont = 60
  }

  showFont() {
    if (this.yBack == 0) {
      this.fontFirst = true;
      setTimeout(() => { this.isHidden = false }, 600);
    }
    else {
      this.yBack = -50
      this.yFont = -55
    }
  }

  selectDisplay(display: number) {
    this.actorData.changeDisplayValue(display)
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }
}

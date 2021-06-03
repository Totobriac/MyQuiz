import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-plot',
  templateUrl: './tool-plot.component.html',
  styleUrls: ['./tool-plot.component.css'],
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

export class ToolPlotComponent implements OnInit {

  tools: PlotTools;
  subscription: Subscription;
  yFont: number = 0;
  yBack: number = 0;
  fontFirst: boolean = false;
  isHidden: boolean = true;
  toolColor: any;

  constructor(private toolsService: ToolsService,
    private plotTools: PlotToolsDataService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subscription = this.plotTools.currentPlotTools.subscribe(tools => this.tools = tools);
    this.plotTools.changeCard("question");   
  }
  
  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)' 
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

  changeFontSize(selectedSize: number) {
    this.plotTools.changePalette("none", "none")
    var fontSize = this.tools.fontSize
    this.tools.card == "question" ? fontSize[0] = selectedSize : fontSize[1] = selectedSize
    this.plotTools.changeFontSize(fontSize);
  }

  changeOpacity(selectedOpacity: number) {
    this.plotTools.changePalette("none", "none");
    var opacity = this.tools.opacity
    this.tools.card == "question" ? opacity[0] = selectedOpacity : opacity[1] = selectedOpacity
    this.plotTools.changeOpacity(opacity);
  }

  onChangeCorner() {
    this.plotTools.changePalette("none", "none");
    var corner = this.tools.corner
    var corn
    this.tools.card == "question"
      ? corn = this.toolsService.corner(this.tools.corner[0].index)
      : corn = this.toolsService.corner(this.tools.corner[1].index)
    this.tools.card == "question"
      ? corner[0] = corn
      : corner[1] = corn
    this.plotTools.changeCorner(corner);
  }

  changeBorder() {
    this.plotTools.changePalette("none", "none");
    var border = this.tools.border
    var bord
    this.tools.card == "question"
      ? bord = this.toolsService.border(this.tools.border[0].index)
      : bord = this.toolsService.border(this.tools.border[1].index)
    this.tools.card == "question"
      ? border[0] = bord
      : border[1] = bord
    this.plotTools.changeBorder(border);
  }

  changeFontFamily(next: number) {
    this.plotTools.changePalette("none", "none");
    var family = this.tools.fontFamily
    var fam
    this.tools.card == "question"
      ? fam = this.toolsService.family(this.tools.fontFamily[0].index, next)
      : fam = this.toolsService.family(this.tools.fontFamily[1].index, next)
    this.tools.card == "question"
      ? family[0] = fam
      : family[1] = fam
    this.plotTools.changeBorder(family);    
  }

  isBold() {
    this.plotTools.changePalette("none", "none");
    var weight = this.tools.weight
    this.tools.card == "question"
      ? weight[0] == "normal" ? weight[0] = "bold" : weight[0] = "normal"
      : weight[1] == "normal" ? weight[1] = "bold" : weight[1] = "normal"
    this.plotTools.changeWeight(weight)
  }

  selectTheme(theme: number) {
    this.plotTools.changePalette("none", "none");
    this.toolsService.theme(theme)
      .subscribe((backgrounds) => {
        var back = backgrounds
        this.plotTools.changeTheme(back);
        this.plotTools.changeBackground(back[0])
      })
  }

  changeBackground(next: number) {
    this.plotTools.changePalette("none", "none");
    var index = this.tools.background.id + next;
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.plotTools.changeBackground(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.plotTools.changePalette(tool, this.tools.card);
  }

  onChange() {
    this.plotTools.changePalette("none", "none");
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
}

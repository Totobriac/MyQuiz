import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-plot',
  templateUrl: './tool-plot.component.html',
  styleUrls: ['./tool-plot.component.css'],
})

export class ToolPlotComponent implements OnInit {

  tools: PlotTools
  subscription: Subscription
  yFont: number = 0
  yBack: number = 0
  fontFirst: boolean = false;
  isHidden: boolean = true;

  constructor (private toolsService : ToolsService,
               private plotTools : PlotToolsDataService) {}

  ngOnInit(): void {
    this.subscription = this.plotTools.currentPlotTools.subscribe(tools => this.tools = tools)
    console.log(this.tools.card);
  } 

  changeFontSize(selectedSize) {
    this.plotTools.changePalette("none")
    this.plotTools.changeFontSize(selectedSize)
  }

  changeOpacity(opacity) {
    this.plotTools.changePalette("none")
    this.plotTools.changeOpacity(opacity)
  }  

  onChangeCorner() {
    this.plotTools.changePalette("none")
    var corner = this.toolsService.corner(this.tools.corner.index)
    this.plotTools.changeCorner(corner)
  }

  changeBorder() {
    this.plotTools.changePalette("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.plotTools.changeBorder(border)
  } 

  changeFontFamily(next: number) {
    this.plotTools.changePalette("none")
    var family = this.toolsService.family(this.tools.fontFamily.index, next)
    this.plotTools.changeFontFamily(family)
  }

  isBold() {
    this.plotTools.changePalette("none")
    this.tools.weight == "normal" ? this.plotTools.changeWeight("bold") : this.plotTools.changeWeight("normal")
  }

  selectTheme(theme: number) {
    this.plotTools.changePalette("none")   
    this.toolsService.theme(theme)
    .subscribe((backgrounds) => {var back = backgrounds 
                                this.plotTools.changeTheme(back);
                                this.plotTools.changeBackground(back[0])})    
  }

  changeBackground(next: number) {
    this.plotTools.changePalette("none")
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.plotTools.changeBackground(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.plotTools.changePalette(tool)  
  }

  onChange() {
    this.plotTools.changePalette("none")
  }

  showBack() {
    setTimeout(() => { this.isHidden = false}, 1000);
    this.fontFirst = false
    this.yBack = -50
    this.yFont = 60
  }

  showFont() {
    if (this.yBack == 0) {
      this.fontFirst = true;
      setTimeout(() => { this.isHidden = false}, 600);
    }
    else {
      this.yBack = -50
      this.yFont = -55
    }
  }

}

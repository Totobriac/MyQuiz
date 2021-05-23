import { trigger, transition, style, animate } from '@angular/animations';
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

  selectedTools: string = "Background"
  showFonts: boolean = false;
  tools: PlotTools
  subscription: Subscription

  constructor (private toolsService : ToolsService,
               private plotToolsData : PlotToolsDataService) {}

  ngOnInit(): void {
    this.subscription = this.plotToolsData.currentPlotTools.subscribe(tools => this.tools = tools)
  }  

  changeFontSize(selectedSize) {
    this.plotToolsData.changePalette("none")
    this.plotToolsData.changeFontSize(selectedSize)
  }

  changeOpacity(opacity) {
    this.plotToolsData.changePalette("none")
    this.plotToolsData.changeOpacity(opacity)
  }  

  onChangeCorner() {
    this.plotToolsData.changePalette("none")
    var corner = this.toolsService.corner(this.tools.corner.index)
    this.plotToolsData.changeCorner(corner)
  }

  changeBorder() {
    this.plotToolsData.changePalette("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.plotToolsData.changeBorder(border)
  } 

  changeFontFamily(next: number) {
    this.plotToolsData.changePalette("none")
    var family = this.toolsService.family(this.tools.fontFamily.index, next)
    this.plotToolsData.changeFontFamily(family)
  }

  isBold() {
    this.plotToolsData.changePalette("none")
    this.tools.weight == "normal" ? this.plotToolsData.changeWeight("bold") : this.plotToolsData.changeWeight("normal")
  }

  selectTheme(theme: number) {
    this.plotToolsData.changePalette("none")   
    this.toolsService.theme(theme)
    .subscribe((backgrounds) => {var back = backgrounds 
                                this.plotToolsData.changeTheme(back);
                                this.plotToolsData.changeBackground(back[0])})    
  }

  changeBackground(next: number) {
    this.plotToolsData.changePalette("none")
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.plotToolsData.changeBackground(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.plotToolsData.changePalette(tool)  
  }

  onChange() {
    this.plotToolsData.changePalette("none")
    this.showFonts = !this.showFonts   
    this.selectedTools == "Fonts" ? this.selectedTools = "Background" : this.selectedTools = "Fonts"
  }  

}

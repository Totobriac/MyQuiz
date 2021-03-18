import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlotTools } from 'src/app/interfaces/plotTools';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-plot',
  templateUrl: './tool-plot.component.html',
  styleUrls: ['./tool-plot.component.css']
})
export class ToolPlotComponent implements OnInit {

  selectedTools: string = "Background"
  showFonts: boolean = false;

  tools: PlotTools
  subscription: Subscription  

  ngOnInit(): void {
    this.subscription = this.data.currentPlotTools.subscribe(tools => this.tools = tools)
  }

  constructor (private toolsService : ToolsService,
               private data : MovieDataService) {}

  changeFontSize(selectedSize) {
    this.data.changePalette("none")
    this.data.changeFontSize(selectedSize)
  }

  changeOpacity(opacity) {
    this.data.changePalette("none")
    this.data.changeOpacity(opacity)
  }  

  onChangeCorner() {
    this.data.changePalette("none")
    var corner = this.toolsService.corner(this.tools.corner.index)
    this.data.changeCorner(corner)
  }

  changeBorder() {
    this.data.changePalette("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.data.changeBorder(border)
  } 

  changeFontFamily(next: number) {
    this.data.changePalette("none")
    var family = this.toolsService.family(this.tools.fontFamily.index, next)
    this.data.changeFontFamily(family)
  }

  isBold() {
    this.data.changePalette("none")
    this.tools.weight == "normal" ? this.data.changeWeight("bold") : this.data.changeWeight("normal")
  }

  selectTheme(theme: number) {
    this.data.changePalette("none")   
    this.toolsService.theme(theme)
    .subscribe((backgrounds) => {var back = backgrounds 
                                this.data.changeTheme(back);
                                this.data.changeBackground(back[0])})    
  }

  changeBackground(next: number) {
    this.data.changePalette("none")
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.data.changeBackground(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.data.changePalette(tool)  
  }

  onChange() {
    this.data.changePalette("none")
    this.showFonts = !this.showFonts   
    this.selectedTools == "Fonts" ? this.selectedTools = "Background" : this.selectedTools = "Fonts"
  }  

}

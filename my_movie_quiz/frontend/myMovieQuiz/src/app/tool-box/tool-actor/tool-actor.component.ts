import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActorTools } from 'src/app/interfaces/actorTools';
import { MovieDataService } from 'src/app/services/movie-data.service';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-actor',
  templateUrl: './tool-actor.component.html',
  styleUrls: ['./tool-actor.component.css']
})
export class ToolActorComponent implements OnInit {

  selectedTools: string = "Background"
  showFonts: boolean = false;

  tools: ActorTools
  subscription: Subscription  

  ngOnInit(): void {
    this.subscription = this.data.currentActorTools.subscribe(tools => this.tools = tools)
  }

  constructor (private toolsService : ToolsService,
               private data : MovieDataService) {}

  changeFontSize(selectedSize) {
    this.data.changePalette("none")
    this.data.changeFontSize(selectedSize)
  }

  changeOpacity(opacity) {
    this.data.changePaletteA("none")
    this.data.changeOpacityA(opacity)
  }  

  onChangeCorner() {
    this.data.changePaletteA("none")
    var corner = this.toolsService.corner(this.tools.corner.index)
    this.data.changeCornerA(corner)
  }

  changeBorder() {
    this.data.changePaletteA("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.data.changeBorderA(border)
  } 

  changeFontFamily(next: number) {
    this.data.changePaletteA("none")
    var family = this.toolsService.family(this.tools.fontFamily.index, next)
    this.data.changeFontFamilyA(family)
  }

  isBold() {
    this.data.changePaletteA("none")
    this.tools.weight == "normal" ? this.data.changeWeightA("bold") : this.data.changeWeightA("normal")
  }

  selectTheme(theme: number) {
    this.data.changePaletteA("none")   
    this.toolsService.theme(theme)
    .subscribe((backgrounds) => {var back = backgrounds 
                                this.data.changeThemeA(back);
                                this.data.changeBackgroundA(back[0])})    
  }

  changeBackground(next: number) {
    this.data.changePaletteA("none")
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.data.changeBackgroundA(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.data.changePaletteA(tool)  
  }

  onChange() {
    this.data.changePaletteA("none")
    this.showFonts = !this.showFonts   
    this.selectedTools == "Fonts" ? this.selectedTools = "Background" : this.selectedTools = "Fonts"
  }  
    
 }
  
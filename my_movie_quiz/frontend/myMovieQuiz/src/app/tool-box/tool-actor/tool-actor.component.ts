import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActorTools } from 'src/app/interfaces/actorTools';
import { ActorDataService } from 'src/app/services/actor-data.service';
import { ActorToolsDataService } from 'src/app/services/actorTools-data.service';
import { ToolsService } from '../tools.service';


@Component({
  selector: 'app-tool-actor',
  templateUrl: './tool-actor.component.html',
  styleUrls: ['./tool-actor.component.css']
})
export class ToolActorComponent implements OnInit {

  tools: ActorTools
  subscription: Subscription
  yFont: number = 0
  yBack: number = 0
  fontFirst: boolean = false;
  isHidden: boolean = true;


  constructor (private toolsService : ToolsService,
               private actorToolsData : ActorToolsDataService,
               private actorData : ActorDataService) {}

  ngOnInit(): void {
    this.subscription = this.actorToolsData.currentActorTools.subscribe(tools => this.tools = tools)
  }

  changeOpacity(opacity) {
    this.actorToolsData.changePalette("none")
    this.actorToolsData.changeOpacity(opacity)
  }  

  onChangeCorner() {
    this.actorToolsData.changePalette("none")
    var corner = this.toolsService.corner(this.tools.corner.index)
    this.actorToolsData.changeCorner(corner)
  }

  changeBorder() {
    this.actorToolsData.changePalette("none")
    var border = this.toolsService.border(this.tools.border.index)
    this.actorToolsData.changeBorder(border)
  } 

  changeFontFamily(next: number) {
    this.actorToolsData.changePalette("none")
    var family = this.toolsService.family(this.tools.fontFamily.index, next)
    this.actorToolsData.changeFontFamily(family)
  }

  isBold() {
    this.actorToolsData.changePalette("none")
    this.tools.weight == "normal" ? this.actorToolsData.changeWeight("bold") : this.actorToolsData.changeWeight("normal")
  }

  selectTheme(theme: number) {
    this.actorToolsData.changePalette("none")   
    this.toolsService.theme(theme)
    .subscribe((backgrounds) => {var back = backgrounds 
                                this.actorToolsData.changeTheme(back);
                                this.actorToolsData.changeBackground(back[0])})    
  }

  changeBackground(next: number) {
    this.actorToolsData.changePalette("none")
    var index = this.tools.background.id + next
    if (index == this.tools.backgrounds.length) {
      index = 0
    } else if (index == -1) {
      index = this.tools.backgrounds.length - 1
    }
    this.actorToolsData.changeBackground(this.tools.backgrounds[index])
  }

  changeColor(tool: string) {
    this.actorToolsData.changePalette(tool)  
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

  selectDisplay(display: number) {
    this.actorData.changeDisplayValue(display)
  }
}
  
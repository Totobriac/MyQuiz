import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlotTools} from 'src/app/interfaces/plotTools';
import { ActorTools} from 'src/app/interfaces/actorTools';
import { PlotToolsDataService } from 'src/app/services/plotTools-data.service';
import { ActorToolsDataService } from 'src/app/services/actorTools-data.service';
import { PosterToolsDataService } from 'src/app/services/posterTools-data.service';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {


  colors: string[] = [ "0, 0, 0", "192, 192, 192", "255, 0, 0",
                      "255, 255, 0", "0, 128, 0", "0, 255, 255",
                      "128, 0, 128", "255, 0, 255", "0, 128, 128",
                      "255, 255, 255"]

  subscription: Subscription
  plotTools: PlotTools
  actorTools: ActorTools
  posterTools: any;

  constructor(private plotToolsData: PlotToolsDataService,
              private actorToolsData: ActorToolsDataService,
              private posterToolsData: PosterToolsDataService) { }

  ngOnInit(): void {
    this.subscription = this.plotToolsData.currentPlotTools.subscribe(tools => this.plotTools = tools)
    this.subscription = this.actorToolsData.currentActorTools.subscribe(tools => this.actorTools = tools)
    this.subscription = this.posterToolsData.currentPosterTools.subscribe(tools => this.posterTools = tools)

  }

  newColor(color) {
    console.log(this.plotTools.palette);
    if (this.plotTools.palette.tool == "plotFont") {
      var colors = this.plotTools.fontColor
      this.plotTools.palette.card == "question"
        ? colors[0] = color
        : colors[1] = color
      this.plotToolsData.changeFontColor(colors)
    } else if (this.plotTools.palette.tool == "plotBack") {
      var colors = this.plotTools.backColor
      this.plotTools.palette.card == "question"
        ? colors[0] = color
        : colors[1] = color
      this.plotToolsData.changeBackColor(colors)
    } else if (this.plotTools.palette.tool == "plotBorder") {
      var colors = this.plotTools.borderColor
      this.plotTools.palette.card == "question"
        ? colors[0] = color
        : colors[1] = color
      this.plotToolsData.changeBorderColor(colors)
    } else if (this.actorTools.palette == "actorFont") {
      this.actorToolsData.changeFontColor(color)
    } else if (this.actorTools.palette == "actorBack") {
      this.actorToolsData.changeBackColor(color)
    } else if (this.actorTools.palette == "actorBorder") {
      this.actorToolsData.changeBorderColor(color)
    } else if (this.posterTools.palette == "posterBorder") {
      this.posterToolsData.changeBorderColor(color)
    }
  }
}

import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlotTools} from 'src/app/interfaces/plotTools';
import { ActorTools} from 'src/app/interfaces/actorTools';
import { MovieDataService } from 'src/app/services/movie-data.service';

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

  constructor(private data : MovieDataService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentPlotTools.subscribe(tools => this.plotTools = tools)
    this.subscription = this.data.currentActorTools.subscribe(tools => this.actorTools = tools)
  }

  newColor(color) {
    if (this.plotTools.palette == "plotFont") {
      this.data.changeFontColor(color)
    } else if (this.plotTools.palette == "plotBack") {
      this.data.changeBackColor(color)
    } else if (this.plotTools.palette == "plotBorder") {
      this.data.changeBorderColor(color)
    } else if (this.actorTools.palette == "actorFont") {
      this.data.changeFontColorA(color)
    } else if (this.actorTools.palette == "actorBack") {
      this.data.changeBackColorA(color)
    } else if (this.actorTools.palette == "actorBorder") {
      this.data.changeBorderColorA(color)
    } 
  }
}

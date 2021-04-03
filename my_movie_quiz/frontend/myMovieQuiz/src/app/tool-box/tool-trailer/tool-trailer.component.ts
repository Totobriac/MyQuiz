import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrailerTools } from 'src/app/interfaces/trailerTools';
import { TrailerToolsDataService } from 'src/app/services/trailerTools-data.service';


@Component({
  selector: 'app-tool-trailer',
  templateUrl: './tool-trailer.component.html',
  styleUrls: ['./tool-trailer.component.css']
})
export class ToolTrailerComponent implements OnInit {

  tools: TrailerTools
  subscription: Subscription
  previewPics: object[] = []
  scrapPics: object[] = []

  constructor( private trailerToolsData: TrailerToolsDataService) { }

  ngOnInit(): void {
    this.subscription = this.trailerToolsData.currentTrailerTools.subscribe(tools => this.previewPics = tools.previewPic)
    this.subscription = this.trailerToolsData.currentTrailerTools.subscribe(tools => this.scrapPics = tools.scrapPic)

  }

  deletePic() {
    this.previewPics.shift();
    this.trailerToolsData.addPreviewPic(this.previewPics)
  }

  savePic() {
    this.scrapPics.push(this.previewPics[0])
    this.trailerToolsData.addScrapPic(this.scrapPics)
    this.previewPics.shift();
    this.trailerToolsData.addPreviewPic(this.previewPics)
  }
}

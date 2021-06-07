import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrailerTools } from 'src/app/interfaces/trailerTools';
import { TrailerToolsDataService } from 'src/app/services/trailerTools-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-tool-trailer',
  templateUrl: './tool-trailer.component.html',
  styleUrls: ['./tool-trailer.component.css'],
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
export class ToolTrailerComponent implements OnInit {

  tools: TrailerTools;
  subscription: Subscription;
  toolColor: any;

  constructor(private trailerToolsData: TrailerToolsDataService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subscription = this.trailerToolsData.currentTrailerTools.subscribe(tools => this.tools = tools)    
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

  deletePic() {
    var previewPics = this.tools.previewPic
    previewPics.shift();
    this.trailerToolsData.addPreviewPic(previewPics)
  }

  savePic() {
    var scrapPics: object[] = this.tools.scrapPic
    var previewPics: object[] = this.tools.previewPic
    scrapPics.push(previewPics[0])
    this.trailerToolsData.addScrapPic(scrapPics)
    previewPics.shift();
    this.trailerToolsData.addPreviewPic(previewPics)
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   let oldtarget = this.scrapPics[event.previousIndex];
  //   this.scrapPics[event.previousIndex] = this.scrapPics[event.currentIndex];
  //   this.scrapPics[event.currentIndex] = oldtarget;
  // }
}

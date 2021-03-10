import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchActor } from './actor-question.service';
import { PixelActor } from './actor-pixel.service';
import { ɵangular_material_src_cdk_bidi_bidi_a } from '@angular/cdk/bidi';

@Component({
  selector: 'app-actor-question',
  templateUrl: './actor-question.component.html',
  styleUrls: ['./actor-question.component.css']
})

export class ActorQuestionComponent implements OnInit {

  @Input() quizedMovie;
  @Input() actorPicUrl: any;
  @Input() oldId: any;
  @Input() changeColor: object;
  @Input() actFF: string;
  @Input() actBack: string;
  @Input() actorOpacity: number;
  @Input() actCorn: string;
  @Input() isBold: boolean;
  @Input() actorBorder: string;
  @Input() actorBackColor: any;
  @Input() actorFontColor: any;
  @Input() actorBorderColor: any;
  @Input() display: any;
  @Input() imgClassSaved: boolean[]
  @Input() pixelValueSaved: number[]
  @Input() src: any[]
  @Input() photoIndexSaved: number[]

  @Output() setActorBackColor= new EventEmitter
  @Output() setActorFontColor= new EventEmitter
  @Output() setActorBorderColor= new EventEmitter
  @Output() savePicUrl = new EventEmitter
  @Output() saveId = new EventEmitter
  @Output() saveImgClass = new EventEmitter
  @Output() savePixelValue = new EventEmitter
  @Output() saveSrc = new EventEmitter
  @Output() savePhotoIndex = new EventEmitter

  actors: any = [];
  actorName: any = ["","","",""];
  actorCharacter: any = ["","","",""];
  imgClass: boolean[];
  pixelValue: number[];
  photoIndex: number[];
  selectedActor: number;
  showQuestion: boolean = true;
  pixHeight: any;
  pixWidth: any;  
  fontColor: any;
  backTextColor: any;
  color: any;
  displayName: string[]
  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg";

  constructor(private searchActor: SearchActor,
              private pixelActor: PixelActor) {}

  ngOnInit(){   
    this.retreiveActors()
  }

  ngOnChanges(changes) {    
    this.actorBackColor == undefined ? this.actorBackColor = "255, 255, 255" : this.actorBackColor = this.actorBackColor
    this.backTextColor = "rgba(" + this.actorBackColor + "," + this.actorOpacity + ")"
    this.selectDisplay()
  }

  getActorsList() {    
    this.actors = this.quizedMovie.cast.slice(0,4)
    for (let i = 0; i < this.actors.length; i++) {  
      this.actorName[i] = this.actors[i].actor
      this.actorCharacter[i] = this.actors[i].character}
  }

  getPicturesList() {
    this.searchActor.searchActor(this.actorName.join('$'))
      .subscribe (r => {this.actorPicUrl = r})                              
  }

  selectActor(index) {
    this.selectedActor = index
  }

  nextPicture(nOrP: number, selectedActor: number) {
    var oldPic
    var wasPixelated = false
    if (this.src != undefined && this.src[selectedActor] != undefined) {
      oldPic = this.src[selectedActor][0]
      wasPixelated = true
      this.src[selectedActor] = void (0)
    }
    this.pixelValue[this.selectedActor] = 0
    if (this.photoIndex[selectedActor] + nOrP == this.actorPicUrl[selectedActor].length) {
      this.photoIndex[selectedActor] = 0
      if (wasPixelated == true) {
        this.actorPicUrl[this.selectedActor][this.actorPicUrl[selectedActor].length] = oldPic
        this.imgClass[this.selectedActor] = false
      }
    } else if (this.photoIndex[selectedActor] + nOrP == -1) {
      this.photoIndex[selectedActor] = this.actorPicUrl[selectedActor].length - 1
      if (wasPixelated == true) {
        this.actorPicUrl[this.selectedActor][0] = oldPic
        this.imgClass[this.selectedActor] = false
      }
    } else {
      this.photoIndex[selectedActor] = this.photoIndex[selectedActor] + nOrP
      if (wasPixelated == true) {
        this.actorPicUrl[this.selectedActor][this.photoIndex[this.selectedActor] + (nOrP * -1)] = oldPic
        this.imgClass[this.selectedActor] = false
      }
    }
  }

  submitForm(form: any) {
    this.searchActor.searchActor(this.actors[this.selectedActor].actor + " " + form.actorSearch + " actor")       
      .subscribe((r:any) => { this.actorPicUrl[this.selectedActor] = r[0]})    
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  pixelize(value) {
    if (this.src == undefined) {
      this.src = [undefined, undefined, undefined, undefined]
      this.src[this.selectedActor] = this.pixelActor.pixelate(this.selectedActor)
    } else if (value == 1 && this.src[this.selectedActor] == undefined) {
      this.src[this.selectedActor] = this.pixelActor.pixelate(this.selectedActor)
    } else if (value > 1 && this.src[this.selectedActor] != undefined) {
      this.src[this.selectedActor] = this.src[this.selectedActor]
    }
    this.pixelValue[this.selectedActor] = value
    this.actorPicUrl[this.selectedActor][this.photoIndex[this.selectedActor]] = this.src[this.selectedActor][value]
    this.pixelValue[this.selectedActor] == 0 ? this.imgClass[this.selectedActor] = false : this.imgClass[this.selectedActor] = true
  }

  onSelectedFontColor(color) {
    this.actorFontColor = color    
    this.fontColor= "rgb(" + this.actorFontColor + ")"
    this.setActorFontColor.emit(this.fontColor)   
  }

  onSelectedBackTextColor(color) {  
    this.actorBackColor = color
    this.setActorBackColor.emit(color)
    this.backTextColor = "rgba(" + color + ", 0.7)"
  }

  onSelectedBorderColor(color) {
    this.actorBorderColor = color
    this.setActorBorderColor.emit(color)
  }

  getWeight() {
    if (this.isBold == undefined) {
      return("normal")}
    else if (this.isBold['question'] == 2 && this.isBold['value'] == true) {
      return("bold")}
    else if (this.isBold['question'] == 2 && this.isBold['value'] == false) {
      return("normal")}
  }

  getBorder() {
    var border: string
    this.actorBorder == undefined ? border='none' : border= this.actorBorder
    this.actorBorderColor == undefined ? border = border : border = border + ' rgb(' + this.actorBorderColor + ')'
    return border
  }

  selectDisplay () {    
    if (this.display === undefined || this.display === "Name") {
      this.displayName = this.actorName
    } else if (this.display === "Character") {
      this.displayName = this.actorCharacter
    } else {this.displayName = ["", "", "", ""]}
  }

  ngOnDestroy() {
    this.savePicUrl.emit(this.actorPicUrl)
    this.saveId.emit(this.quizedMovie['id'])
    this.saveImgClass.emit(this.imgClass)
    this.savePixelValue.emit(this.pixelValue)
    this.saveSrc.emit(this.src)
    this.savePhotoIndex.emit(this.photoIndex)
  }

  retreiveActors() {
    if (this.oldId == undefined) {
      this.getActorsList()
      this.getPicturesList()
      this.photoIndex = [0, 0, 0, 0]
      this.pixelValue =  [0, 0, 0, 0]
      this.imgClass =  [false, false, false, false]
    } else if (this.oldId != this.quizedMovie['id']) {
      console.log('newId');
      this.actorPicUrl = void(0)
      this.getActorsList()
      this.getPicturesList()
      this.photoIndex = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
      this.src = [undefined, undefined, undefined, undefined]
      this.pixelValue =  [0, 0, 0, 0]
      this.imgClass =  [false, false, false, false] 
    } else if (this.actorPicUrl == undefined ) {
      this.getActorsList()
      this.getPicturesList()
      this.photoIndex = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
      this.src = [undefined, undefined, undefined, undefined]
      this.pixelValue =  [0, 0, 0, 0]
      this.imgClass =  [false, false, false, false]
    } else { this.getActorsList()
             this.actorPicUrl = this.actorPicUrl
             this.photoIndex = this.photoIndexSaved
             this.pixelValue = this.pixelValueSaved
             this.imgClass = this.imgClassSaved }
    this.changeColor ? this.changeColor['change'] = false : null
  }
}

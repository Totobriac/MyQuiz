import { Component, Input, OnInit } from '@angular/core';
import { SearchActor } from './actor-question.service';
import { PixelActor } from './actor-pixel.service'


@Component({
  selector: 'app-actor-question',
  templateUrl: './actor-question.component.html',
  styleUrls: ['./actor-question.component.css']
})


export class ActorQuestionComponent implements OnInit {
  @Input() quizedMovie;

  constructor(private searchActor: SearchActor,
              private pixelActor: PixelActor) {}

  actors: any = []
  actorPics:any = ["","","",""]
  actorName:any = ["","","",""]
  imgClass = [false, false, false, false]
  model: any
  pixelValue: any 

  actorPicUrl: any = ["","","",""]
  photoIndex = [0, 0, 0, 0]
  selectedActor: number
  showQuestion = true
  response: any[]
  pixHeight: any
  pixWidth: any

  bottomToolBox : boolean = false

  @Input() changeColor: object;
  @Input() actFF: string;
  @Input() actBack: string;
  @Input() backOpacity: number;
  @Input() cornerStyle: object;
  @Input() isBold: boolean;
  @Input() borderStyle: string

  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/scary/pexels-onanini-750319.jpg"   
  fontColor: any
  backTextColor: any
  color: any
  borderColor: any

  displays = [{value:"Name", checked: true},
              {value: "Character", checked: false},
              {value: "None", checked: false}];
  nameDisplay: ""  

  ngOnInit(){
    this.getPicturesList()
  }

  ngOnChanges(changes) {
    this.color == undefined ? this.color = "255, 255, 255" : this.color =  this.color
    this.backTextColor = "rgba(" + this.color + "," + this.backOpacity + ")"    
  }

  getPicturesList () {    
    this.actors = this.quizedMovie.cast.slice(0,4)
      for (let i = 0; i < this.actors.length; i++) {  
        this.actorName[i] = this.actors[i].actor}     
      var actorsString = this.actorName.join('$')
      this.searchActor.searchActor(actorsString)
        .subscribe (r => {this.actorPicUrl = r
                          console.log(r)})                              
  }

  selectActor(index) {
    this.selectedActor = index
  }
                
  previousPicture(selectedActor) {
    this.photoIndex[selectedActor] -- 
    this.imgClass[selectedActor] = false
  }

  nextPicture(selectedActor) {
    this.photoIndex[selectedActor] ++        
    this.imgClass[selectedActor] = false
  }

  submitForm(form: any) {
    console.log(this.actorPicUrl[this.selectedActor])
    this.searchActor.searchActor(this.actors[this.selectedActor].actor + " " + form.actorSearch + " actor")       
      .subscribe((r:any) => { this.actorPicUrl[this.selectedActor] = r[0]})    
  }

  selectDisplay (display) {    
    if (display.value === "Name") {
      this.actorName[this.selectedActor] = this.actors[this.selectedActor].actor
    } else if (display.value === "Character") {
      this.actorName[this.selectedActor] = this.actors[this.selectedActor].character
    } else {this.actorName[this.selectedActor] = ""}
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  pixelize(value) {
    var src = this.pixelActor.pixelate(this.selectedActor, value)
    this.actorPicUrl[this.selectedActor][this.photoIndex[this.selectedActor]]= src    
    this.imgClass[this.selectedActor] = true
  }

  showBottomTools() {
    this.bottomToolBox = true
  }

  onSelectedFontColor(color) {
    this.fontColor= "rgb(" + color + ")"
  }

  onSelectedBackTextColor(color) {  
    this.color = color
    this.backTextColor = "rgba(" + color + ", 0.7)"
  }

  getRadius() {
    if (this.cornerStyle == undefined) {
      return('0px')
    } else if (this.cornerStyle['question'] == 2) {
        return(this.cornerStyle['value'])}
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
    this.borderStyle == undefined ? border='none' : border= this.borderStyle
    this.borderColor == undefined ? border = border : border = border + ' rgb(' + this.borderColor + ')'
    return border
  }

  onSelectedBorderColor(color) {
    this.borderColor = color
  }

}

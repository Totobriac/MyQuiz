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

  displays = [{value:"Name", checked: true},
              {value: "Character", checked: false},
              {value: "None", checked: false}];
  nameDisplay: ""  

  ngOnInit(){
    this.getPicturesList()    
  }

  getPicturesList () {    
    this.actors = this.quizedMovie.cast.slice(0,4)
    for (let i = 0; i < this.actors.length; i++) {  
      this.actorName[i] = this.actors[i].actor}     
    var actorsString = this.actorName.join('-')
    this.searchActor.searchActor(actorsString)
      .subscribe (r => {this.actorPicUrl = r})                              
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
    this.searchActor.searchActor(this.actors[this.selectedActor].actor + form.actorSearch)       
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
    var src = this.pixelActor.pixelate(this.selectedActor, value.value)
    this.actorPicUrl[this.selectedActor][this.photoIndex[this.selectedActor]]= src    
    this.imgClass[this.selectedActor] = true
  }
}

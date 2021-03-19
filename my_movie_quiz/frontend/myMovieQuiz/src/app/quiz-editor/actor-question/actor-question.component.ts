import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchActor } from './actor-question.service';
import { PixelActor } from './actor-pixel.service';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { ActorTools} from 'src/app/interfaces/actorTools';
import { ActorToolsDataService } from 'src/app/services/actorTools-data.service';

@Component({
  selector: 'app-actor-question',
  templateUrl: './actor-question.component.html',
  styleUrls: ['./actor-question.component.css']
})

export class ActorQuestionComponent implements OnInit {

  @Input() actorPicUrl: any;
  @Input() oldId: any;
  
  @Input() display: any;
  @Input() imgClassSaved: boolean[]
  @Input() pixelValueSaved: number[]
  @Input() src: any[]
  @Input() photoIndexSaved: number[]

  @Output() savePicUrl = new EventEmitter
  @Output() saveId = new EventEmitter
  @Output() saveImgClass = new EventEmitter
  @Output() savePixelValue = new EventEmitter
  @Output() saveSrc = new EventEmitter
  @Output() savePhotoIndex = new EventEmitter

  actors: any = [];
  actorName: any = ["", "", "", ""];
  actorCharacter: any = ["", "", "", ""];
  imgClass: boolean[];
  pixelValue: number[];
  photoIndex: number[];
  selectedActor: number;
  showQuestion: boolean = true;
  pixHeight: any;
  pixWidth: any;
  displayName: string[]

  movie: Movie
  tools: ActorTools
  subscription: Subscription
  backUrl: any = "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg";

  constructor(private searchActor: SearchActor,
              private pixelActor: PixelActor,
              private movieData: MovieDataService,
              private actorToolsData: ActorToolsDataService) { }

  ngOnInit() {
    this.subscription = this.movieData.currentMovie.subscribe(movie => this.movie = movie)
    this.subscription = this.actorToolsData.currentActorTools.subscribe(tools => this.tools = tools)
    this.photoIndex = [0, 0, 0, 0]
    this.pixelValue = [0, 0, 0, 0]
    this.imgClass = [false, false, false, false]
    this.getActorsList()
    this.getPicturesList()
  }

  getActorsList() {
    this.actors = this.movie.cast.slice(0, 4)
    for (let i = 0; i < this.actors.length; i++) {
      this.actorName[i] = this.actors[i].actor
      this.actorCharacter[i] = this.actors[i].character
    }
  }

  getPicturesList() {
    this.searchActor.searchActor(this.actorName.join('$'))
      .subscribe(r => { this.actorPicUrl = r 
                        console.log('ok')})
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
      .subscribe((r: any) => { this.actorPicUrl[this.selectedActor] = r[0] })
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

  
  selectDisplay() {
    if (this.display === undefined || this.display === "Name") {
      this.displayName = this.actorName
    } else if (this.display === "Character") {
      this.displayName = this.actorCharacter
    } else { this.displayName = ["", "", "", ""] }
  }

  ngOnDestroy() {
    this.savePicUrl.emit(this.actorPicUrl)
    this.saveId.emit(this.movie.id)
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
      this.pixelValue = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
    } else if (this.oldId != this.movie.id) {
      this.actorPicUrl = void (0)
      this.getActorsList()
      this.getPicturesList()
      this.photoIndex = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
      this.src = [undefined, undefined, undefined, undefined]
      this.pixelValue = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
    } else if (this.actorPicUrl == undefined) {
      this.getActorsList()
      this.getPicturesList()
      this.photoIndex = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
      this.src = [undefined, undefined, undefined, undefined]
      this.pixelValue = [0, 0, 0, 0]
      this.imgClass = [false, false, false, false]
    } else {
      this.getActorsList()
      this.actorPicUrl = this.actorPicUrl
      this.photoIndex = this.photoIndexSaved
      this.pixelValue = this.pixelValueSaved
      this.imgClass = this.imgClassSaved
    }
  }
}

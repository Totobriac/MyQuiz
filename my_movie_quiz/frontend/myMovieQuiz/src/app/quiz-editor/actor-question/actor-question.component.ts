import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchActor } from './actor-question.service';
import { PixelActor } from './actor-pixel.service';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { ActorTools} from 'src/app/interfaces/actorTools';
import { ActorToolsDataService } from 'src/app/services/actorTools-data.service';
import { Actor} from 'src/app/interfaces/actor';
import { ActorDataService } from 'src/app/services/actor-data.service';

@Component({
  selector: 'app-actor-question',
  templateUrl: './actor-question.component.html',
  styleUrls: ['./actor-question.component.css']
})

export class ActorQuestionComponent implements OnInit {

  actorName: any = [[], [], [], []]
  showQuestion: boolean = true;
  movie: Movie;
  tools: ActorTools;
  actor: Actor;
  pics: object[] = []
  pixUrls: object[] = []
  pixValue: number[] = []
  urls: any
  actors: any;
  selectAct: number;
  subscription: Subscription;

  constructor(private searchActor: SearchActor,
              private pixelActor: PixelActor,
              private movieData: MovieDataService,
              private actorToolsData: ActorToolsDataService,
              private actorData: ActorDataService) { }

  ngOnInit() {
    this.subscription = this.movieData.currentMovie.subscribe(movie => this.movie = movie)
    this.subscription = this.actorToolsData.currentActorTools.subscribe(tools => this.tools = tools)
    this.subscription = this.actorData.currentActor.subscribe(actor => this.actor = actor)
    this.getActorsList()
    this.getPicturesList()
  }

  getActorsList() {
    this.actors = this.movie.cast.slice(0, 4)
    this.actors.forEach((actor, index) => {
      this.actorName[index].push("")
      this.actorName[index].push(actor.actor)
      this.actorName[index].push(actor.character)
    });
    console.log(this.actorName);

  }

  getPicturesList() {
    this.searchActor.searchActor(this.actorName.join('$'))
      .subscribe(r => {
        this.urls = r
        this.actorData.changeUrls(r)
        for (var i in r) {
          const pic: object = r[i][0]
          this.pics.push(pic)
        }
        this.actorData.changePic(this.pics)
      })
  }

  onSelectedSection(value) {
    this.showQuestion = value
  }

  selectActor(index) {
    this.selectAct = index
  }

  nextPicture(next: number) {
    this.pixUrls[this.selectAct] = void(0)
    this.actorData.changePixUrls(this.pixUrls)
    this.pixValue[this.selectAct] = 0
    this.actorData.changePicValue(this.pixValue)
    var index = this.actor.pic[this.selectAct].index + next
    if (index == this.actor.urls[this.selectAct].length) {
      index = 0
    } else if (index == -1) {
      index = this.actor.urls[this.selectAct].length - 1
    }
    this.pics[this.selectAct] = this.actor.urls[this.selectAct][index]
    this.actorData.changePic(this.pics)
  }

  submitForm(form: any) {
    this.searchActor.searchActor(this.actors[this.selectAct].actor + " " + form.actorSearch + " actor")
      .subscribe((r: any) => { this.urls[this.selectAct] = [];
                               this.actorData.changeUrls(this.urls)
                               for (let i of r[0]) {
                                 this.urls[this.selectAct].push(i)
                               }
                               this.actorData.changeUrls(this.urls)
                               this.pics[this.selectAct] = this.actor.urls[this.selectAct][0]
                               this.actorData.changePic(this.pics)})
  }

  pixelNav(value) {
    if (this.pixUrls[this.selectAct] == undefined) {
      this.pixUrls[this.selectAct] = this.pixelActor.pixelate(this.selectAct, this.actor.pic[this.selectAct])
      this.actorData.changePixUrls(this.pixUrls)}
    
    this.pics[this.selectAct]  = {index: this.actor.pixUrls[this.selectAct][value].picIndex , url: this.actor.pixUrls[this.selectAct][value].src} 
    this.actorData.changePic(this.pics)
    this.pixValue[this.selectAct] = value
    this.actorData.changePicValue(this.pixValue)
  }
}
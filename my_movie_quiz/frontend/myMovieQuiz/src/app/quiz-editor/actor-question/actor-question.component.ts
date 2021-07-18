import { Component, OnInit } from '@angular/core';
import { SearchActor } from './actor-question.service';
import { PixelActor } from './actor-pixel.service';
import { MovieDataService } from "../../services/movie-data.service";
import { Subscription } from 'rxjs';
import { MovieDb } from 'src/app/interfaces/movie';
import { ActorTools } from 'src/app/interfaces/actorTools';
import { ActorToolsDataService } from 'src/app/services/actorTools-data.service';
import { Actor } from 'src/app/interfaces/actor';
import { ActorDataService } from 'src/app/services/actor-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { cardChange, flyingTool } from 'src/app/animations';

@Component({
  selector: 'app-actor-question',
  templateUrl: './actor-question.component.html',
  styleUrls: ['./actor-question.component.css'],
  animations: [flyingTool, cardChange]
})

export class ActorQuestionComponent implements OnInit {

  actorName: any = [["", "", "", ""], [], []]
  movie: MovieDb;
  tools: ActorTools;
  actor: Actor;
  pics: object[] = []
  pixUrls: object[] = []
  pixValue: number[] = []
  urls: any
  selectAct: number;
  subscription: Subscription;
  toolColor: string;
  customSearch: string = "";

  constructor(private searchActor: SearchActor,
    private pixelActor: PixelActor,
    private movieData: MovieDataService,
    private actorTools: ActorToolsDataService,
    private actorData: ActorDataService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscription = this.movieData.currentMovieDb.subscribe(movie => this.movie = movie);
    this.subscription = this.actorTools.currentActorTools.subscribe(tools => this.tools = tools);
    this.subscription = this.actorData.currentActor.subscribe(actor => this.actor = actor);
    this.getActorsList()
    this.getPicturesList()
  }

  getActorsList() {
    var actors = this.movie.cast
    actors.forEach((actor) => {
      this.actorName[1].push(actor.name)
      this.actorName[2].push(actor.character)
    });
  }

  getPicturesList() {
    for (var act of this.movie.cast) {
      const pic: object = { 'index': 0, 'url': "https://www.themoviedb.org/t/p/w185" + act.profile_path }
      this.pics.push(pic)
    }
    this.actorData.changePic(this.pics)
  }

  selectActor(index) {
    this.customSearch = ""
    this.selectAct = index
    this.searchActor.searchActor(this.actorName[1][index], this.movie.cast[index].profile_path)
      .subscribe(r => {
        console.log(r)
        this.urls = this.actor.urls
        this.urls[index] = r
        this.actorData.changeUrls(this.urls)
      })
  }

  addPicture() {
    var search
    this.customSearch != ""
      ? search = this.actorName[1][this.selectAct] + " " + this.customSearch
      : search = this.actorName[1][this.selectAct]

    this.searchActor.addPicture(search)
      .subscribe(r => {
        this.urls = this.actor.urls
        this.urls[this.selectAct] = this.urls[this.selectAct].concat(r)
        this.actorData.changeUrls(this.urls)
      })
  }

  nextPicture(next: number) {
    console.log(this.actor.urls)
    this.pixUrls[this.selectAct] = void (0)
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
    this.searchActor.searchActor(this.actorName[1][this.selectAct] + " " + this.customSearch, "/none")
      .subscribe((r: any) => {
        this.urls = this.actor.urls
        this.urls[this.selectAct] = r
        this.actorData.changeUrls(this.urls)
        this.pics[this.selectAct] = this.actor.urls[this.selectAct][0]
        this.actorData.changePic(this.pics)
      })
  }

  pixelNav(value) {
    if (this.pixUrls[this.selectAct] == undefined) {
      this.pixUrls[this.selectAct] = this.pixelActor.pixelate(this.selectAct, this.actor.pic[this.selectAct])
      this.actorData.changePixUrls(this.pixUrls)
    }

    this.pics[this.selectAct] = { index: this.actor.pixUrls[this.selectAct][value].picIndex, url: this.actor.pixUrls[this.selectAct][value].src }
    this.actorData.changePic(this.pics)
    this.pixValue[this.selectAct] = value
    this.actorData.changePicValue(this.pixValue)
  }

  get style() {
    this.tools.card == "question"
      ? this.toolColor = 'rgb(95,158,160)'
      : this.toolColor = 'rgb(215, 190, 130);'
    return this.sanitizer.bypassSecurityTrustStyle(`--toolcolor: ${this.toolColor}`);
  }

}
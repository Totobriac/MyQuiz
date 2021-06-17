import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer } from '../interfaces/answer';

@Injectable({
  providedIn: 'root'
})

export class AnswerDataService {

  private answerTools = new BehaviorSubject<Answer>({    
    background: {
      author_name: "none",
      highUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
      id: 1,
      lowUrl: "https://moviepictures.s3.eu-west-3.amazonaws.com/assets/bobines_small.jpg",
      stock_name: "none"
    },
    backgrounds: ["empty"],    
  })

  currentAnswerTools = this.answerTools.asObservable();

  changeTheme(backgrounds: any) {
    this.answerTools.next(Object.assign(this.answerTools.value, { backgrounds: backgrounds }))
  }

  changeBackground(background: any) {
    this.answerTools.next(Object.assign(this.answerTools.value, { background: background }))
  }  
}
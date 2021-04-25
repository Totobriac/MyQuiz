import { Injectable } from '@angular/core';
import { Music } from 'src/app/interfaces/music';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})

export class MusicPlayerService {

  music: Music;
  mainSound: any;
  sampleOne: any;
  sampleTwo: any;
  sampleThree: any;
  sampleFour: any;

  play(music) {
    this.mainSound = new Howl({
      src: [music.mainTitle.url],
      html5: true,
      volume: Number(music.mainTitle.volume),
    });
    this.mainSound.play()

    if (music.samples != undefined) {

      if (music.samples[0] != undefined) {
        this.sampleOne = new Howl({
          src: [music.samples[0].url],
          html5: true,
          loop: true,
          volume: Number([music.samples[0].volume]) 
        });
        setTimeout(()=>{                         
          this.sampleOne.play()}, (music.samples[0].start * 1000));
        setTimeout(()=>{                         
          this.sampleOne.stop()}, (music.samples[0].start * 1000 + music.samples[0].duration * 1000));
      }

      if (music.samples[1] != undefined) {
        this.sampleTwo = new Howl({
          src: [music.samples[1].url],
          html5: true,
          loop: true,
          volume: Number([music.samples[1].volume]) 
        });
        setTimeout(()=>{                         
          this.sampleTwo.play()}, (music.samples[1].start * 1000));
        setTimeout(()=>{                         
          this.sampleTwo.stop()}, (music.samples[1].start * 1000 + music.samples[1].duration * 1000));
      }

      if (music.samples[2] != undefined) {
        this.sampleThree = new Howl({
          src: [music.samples[2].url],
          html5: true,
          loop: true,
          volume: Number([music.samples[2].volume]) 
        });
        setTimeout(()=>{                         
          this.sampleThree.play()}, (music.samples[2].start * 1000));
        setTimeout(()=>{                         
          this.sampleThree.stop()}, (music.samples[2].start * 1000 + music.samples[2].duration * 1000));
      }

      if (music.samples[3] != undefined) {
        this.sampleFour = new Howl({
          src: [music.samples[3].url],
          html5: true,
          loop: true,
          volume: Number([music.samples[3].volume]) 
        });
        setTimeout(()=>{                         
          this.sampleFour.play()}, (music.samples[3].start * 1000));
        setTimeout(()=>{                         
          this.sampleFour.stop()}, (music.samples[3].start * 1000 + music.samples[3].duration * 1000));
      }    
    }
  }

  setMainVolume(volume) {
    this.mainSound.volume(volume)
  }

  setSampleVolume(index, volume) {
    if (index == 1) {
      this.sampleOne.volume(volume)
    } else if (index == 2) {
      this.sampleTwo.volume(volume)
    } else if (index == 3) {
      this.sampleThree.volume(volume)
    } else { this.sampleFour.volume(volume) }
  }
}
import { Injectable } from '@angular/core';
import { Music } from 'src/app/interfaces/music';
import { Howl } from 'howler';
import { MusicDataService } from 'src/app/services/music-data.service';

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
  id0: number;
  pausedId0: number;
  id1: number;
  pausedId1: number;
  id2: number;
  pausedId2: number;
  id3: number;
  pausedId3: number;
  id4: number;
  pausedId4: number;
  paused: boolean = false;
  startOneTimeOut: any;
  sampleTwoTimeOut: any;
  sampleThreeTimeOut: any;
  sampleFourTimeOut: any;
  stopOneTimeOut: any;
  position: number = 0
  sampleOneInt: any;

  constructor(private musicDataService: MusicDataService) {}

  play(music) {
    if (this.paused == true) {
      this.mainSound.seek(this.pausedId0);
      this.mainSound.play();

      if (this.pausedId1 != undefined) {
        this.sampleOne.seek(this.pausedId1);
        this.sampleOne.play();
        setTimeout(() => {
          this.sampleOne.stop()
        }, (music.samples[0].start * 1000 + music.samples[0].duration * 1000 - this.pausedId0 * 1000));
      }
      if (this.sampleTwo != undefined) {
        this.sampleTwo.seek(this.pausedId2);
        this.sampleTwo.play();
      }
      if (this.sampleThree != undefined) {
        this.sampleThree.seek(this.pausedId3);
        this.sampleThree.play();
      }
      if (this.sampleFour != undefined) {
        this.sampleFour.seek(this.pausedId4);
        this.sampleFour.play();
      }
    }

    else {
      this.mainSound = new Howl({
        src: [music.mainTitle.url],
        html5: true,
        volume: Number(music.mainTitle.volume),
      });
      this.id0 = this.mainSound.play();
      this.mainSound.on('end', () => { this.musicDataService.isPaused(false) });
      setInterval(() => { this.musicDataService.position(this.mainSound.seek()) }, 100);

      if (music.samples != undefined) {

        if (music.samples[0] != undefined) {
          this.sampleOne = new Howl({
            src: [music.samples[0].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[0].volume]),
          });
          this.startOneTimeOut = setTimeout(() => {
            this.id1 = this.sampleOne.play()
          }, (music.samples[0].start * 1000));
          this.stopOneTimeOut = setTimeout(() => {
            this.sampleOne.stop()
          }, (music.samples[0].start * 1000 + music.samples[0].duration * 1000));
        }

        if (music.samples[1] != undefined) {
          this.sampleTwo = new Howl({
            src: [music.samples[1].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[1].volume])
          });
          this.sampleTwoTimeOut = setTimeout(() => {
            this.id2 = this.sampleTwo.play()
          }, (music.samples[1].start * 1000));
          setTimeout(() => {
            this.sampleTwo.stop()
          }, (music.samples[1].start * 1000 + music.samples[1].duration * 1000));
        }

        if (music.samples[2] != undefined) {
          this.sampleThree = new Howl({
            src: [music.samples[2].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[2].volume])
          });
          this.sampleThreeTimeOut = setTimeout(() => {
            this.id3 = this.sampleThree.play()
          }, (music.samples[2].start * 1000));
          setTimeout(() => {
            this.sampleThree.stop()
          }, (music.samples[2].start * 1000 + music.samples[2].duration * 1000));
        }

        if (music.samples[3] != undefined) {
          this.sampleFour = new Howl({
            src: [music.samples[3].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[3].volume])
          });
          this.sampleFourTimeOut = setTimeout(() => {
            this.id4 = this.sampleFour.play()
          }, (music.samples[3].start * 1000));
          setTimeout(() => {
            this.sampleFour.stop()
          }, (music.samples[3].start * 1000 + music.samples[3].duration * 1000));
        }
      }
    }
  }

  pause() {
    this.paused = true;
    this.mainSound.pause();
    this.pausedId0 = this.mainSound.seek(this.id0);
    
    if (this.id1 != undefined && this.sampleOne.playing()) {
      this.sampleOne.pause();
      this.pausedId1 = this.sampleOne.seek(this.id1);
      clearTimeout(this.stopOneTimeOut)
      console.log(this.pausedId1)
    }
    if (this.id2 != undefined) {
      this.sampleTwo.pause()
      this.pausedId2 = this.sampleTwo.seek(this.id2);
    }
    if (this.id3 != undefined) {
      this.sampleThree.pause()
      this.pausedId3 = this.sampleThree.seek(this.id3);
    }
    if (this.id4 != undefined) {
      this.sampleFour.pause()
      this.pausedId4 = this.sampleFour.seek(this.id4);
    }
  }

  stop() {
    this.paused = false
    this.musicDataService.isPaused(false);
    if (this.mainSound.playing()) this.mainSound.stop();
    if (this.sampleOne && this.sampleOne.playing()) this.sampleOne.stop();
    if (this.sampleTwo && this.sampleTwo.playing()) this.sampleTwo.stop();
    if (this.sampleThree && this.sampleThree.playing()) this.sampleThree.stop();
    if (this.sampleFour && this.sampleFour.playing()) this.sampleFour.stop();
    if (this.sampleOne && this.sampleOne.state() == "loaded") {
      this.sampleOne.unload();
      clearTimeout(this.startOneTimeOut)
    }
    if (this.sampleTwo && this.sampleTwo.state() == "loaded") {
      this.sampleTwo.unload();
      clearTimeout(this.sampleTwoTimeOut)
    }
    if (this.sampleThree && this.sampleThree.state() == "loaded") {
      this.sampleThree.unload();
      clearTimeout(this.sampleThreeTimeOut)
    }
    if (this.sampleFour && this.sampleFour.state() == "loaded") {
      this.sampleFour.unload();
      clearTimeout(this.sampleFourTimeOut)
    }
  }

  setMainVolume(volume) {
    this.mainSound.volume(volume);
  }

  setSampleVolume(index, volume) {
    if (volume != undefined) {
      if (index == 1) {
        this.sampleOne.volume(volume)
      } else if (index == 2) {
        this.sampleTwo.volume(volume)
      } else if (index == 3) {
        this.sampleThree.volume(volume)
      } else { this.sampleFour.volume(volume) }
    }
  }

  mute() {
    this.mainSound.mute(true)
  }

  unmute() {
    this.mainSound.mute(false)
  }
}
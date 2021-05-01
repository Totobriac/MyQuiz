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
  startTwoTimeOut: any;
  startThreeTimeOut: any;
  startFourTimeOut: any;
  stopOneTimeOut: any;
  stopTwoTimeOut: any;
  stopThreeTimeOut: any;
  stopFourTimeOut: any;
  position: number = 0;
  sampleOneInt: any;
  oneWasPlaying: boolean;

  constructor(private musicDataService: MusicDataService) { }

  play(music) {
    if (this.paused == true) {
      this.mainSound.seek(this.pausedId0);
      this.mainSound.play();
      
      if (this.oneWasPlaying == true) {
        this.sampleOne.seek(this.pausedId1)
        this.sampleOne.play();
      }
      else {
        setTimeout(() => {
          this.sampleOne.play()
        }, (music.samples[0].start * 1000 - this.pausedId0 * 1000));
      }
      setTimeout(() => {
        this.sampleOne.stop()
      }, (music.samples[0].start * 1000 + music.samples[0].duration * 1000 - this.pausedId0 * 1000));
      

      if (this.sampleTwo != undefined) {
        this.sampleTwo.seek(this.pausedId2);
        this.sampleTwo.play();
        setTimeout(() => {
          this.sampleTwo.stop()
        }, (music.samples[1].start * 1000 + music.samples[1].duration * 1000 - this.pausedId1 * 1000));
      }
      if (this.sampleThree != undefined) {
        this.sampleThree.seek(this.pausedId3);
        this.sampleThree.play();
        setTimeout(() => {
          this.sampleThree.stop()
        }, (music.samples[2].start * 1000 + music.samples[2].duration * 1000 - this.pausedId2 * 1000));
      }
      if (this.sampleFour != undefined) {
        this.sampleFour.seek(this.pausedId4);
        this.sampleFour.play();
        setTimeout(() => {
          this.sampleFour.stop()
        }, (music.samples[3].start * 1000 + music.samples[3].duration * 1000 - this.pausedId3 * 1000));
      }
    }

    else {
      this.mainSound = new Howl({
        src: [music.mainTitle.url],
        html5: true,
        volume: Number(music.mainTitle.volume),
        mute: music.mainTitle.mute,
        rate: music.mainTitle.rate,
      });
      this.id0 = this.mainSound.play();
      this.mainSound.mute(music.mainTitle.mute)
      this.mainSound.on('load', () => { console.log("loaded") });
      this.mainSound.on('end', () => { this.musicDataService.isPaused(false) });
      setInterval(() => { this.musicDataService.position(this.mainSound.seek()) }, 100);

      if (music.samples != undefined) {

        if (music.samples[0] != undefined) {
          this.sampleOne = new Howl({
            src: [music.samples[0].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[0].volume]),
            rate: music.samples[0].rate,
          });
          this.sampleOne.mute(music.samples[0].mute)
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
            volume: Number([music.samples[1].volume]),
            mute: music.samples[1].mute,
            rate: music.samples[1].rate,
          });
          this.sampleTwo.mute(music.samples[1].mute)
          this.startTwoTimeOut = setTimeout(() => {
            this.id2 = this.sampleTwo.play()
          }, (music.samples[1].start * 1000));
          this.stopTwoTimeOut = setTimeout(() => {
            this.sampleTwo.stop()
          }, (music.samples[1].start * 1000 + music.samples[1].duration * 1000));
        }

        if (music.samples[2] != undefined) {
          this.sampleThree = new Howl({
            src: [music.samples[2].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[2].volume]),
            mute: music.samples[2].mute,
            rate: music.samples[2].rate,
          });
          this.sampleThree.mute(music.samples[2].mute)
          this.startThreeTimeOut = setTimeout(() => {
            this.id3 = this.sampleThree.play()
          }, (music.samples[2].start * 1000));
          this.stopThreeTimeOut = setTimeout(() => {
            this.sampleThree.stop()
          }, (music.samples[2].start * 1000 + music.samples[2].duration * 1000));
        }

        if (music.samples[3] != undefined) {
          this.sampleFour = new Howl({
            src: [music.samples[3].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[3].volume]),
            mute: music.samples[3].mute,
            rate: music.samples[3].rate,
          });
          this.sampleFour.mute(music.samples[3].mute)
          this.startFourTimeOut = setTimeout(() => {
            this.id4 = this.sampleFour.play()
          }, (music.samples[3].start * 1000));
          this.stopFourTimeOut = setTimeout(() => {
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
      clearTimeout(this.stopOneTimeOut);
      this.oneWasPlaying = true;
    }
    if (this.id1 != undefined) {
      clearTimeout(this.startOneTimeOut);
      this.oneWasPlaying = false;
    }
    if (this.id2 != undefined && this.sampleOne.playing()) {
      this.sampleTwo.pause()
      this.pausedId2 = this.sampleTwo.seek(this.id2);
      clearTimeout(this.stopTwoTimeOut)
    }
    if (this.id3 != undefined && this.sampleOne.playing()) {
      this.sampleThree.pause()
      this.pausedId3 = this.sampleThree.seek(this.id3);
      clearTimeout(this.stopThreeTimeOut)
    }
    if (this.id4 != undefined && this.sampleOne.playing()) {
      this.sampleFour.pause()
      this.pausedId4 = this.sampleFour.seek(this.id4);
      clearTimeout(this.stopFourTimeOut)
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
      clearTimeout(this.startTwoTimeOut)
    }
    if (this.sampleThree && this.sampleThree.state() == "loaded") {
      this.sampleThree.unload();
      clearTimeout(this.startThreeTimeOut)
    }
    if (this.sampleFour && this.sampleFour.state() == "loaded") {
      this.sampleFour.unload();
      clearTimeout(this.startFourTimeOut)
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

  mute(i) {
    if (i == 0) this.mainSound.mute(true)
    if (i == 1) this.sampleOne.mute(true)
    if (i == 2) this.sampleTwo.mute(true)
    if (i == 3) this.sampleThree.mute(true)
    if (i == 4) this.sampleFour.mute(true)
  }

  unmute(i) {
    if (i == 0) this.mainSound.mute(false)
    if (i == 1) this.sampleOne.mute(false)
    if (i == 2) this.sampleTwo.mute(false)
    if (i == 3) this.sampleThree.mute(false)
    if (i == 4) this.sampleFour.mute(false)
  }

  setRate(i, rate) {
    if (i == 0) this.mainSound.rate(rate)
    if (i == 1) this.sampleOne.rate(rate)
    if (i == 2) this.sampleTwo.rate(rate)
    if (i == 3) this.sampleThree.rate(rate)
    if (i == 4) this.sampleFour.rate(rate)
  }
}
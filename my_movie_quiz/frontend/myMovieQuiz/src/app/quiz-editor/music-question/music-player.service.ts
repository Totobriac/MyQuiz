import { Injectable } from '@angular/core';
import { Music } from 'src/app/interfaces/music';
import { Howl } from 'howler';
import { MusicDataService } from 'src/app/services/music-data.service';

@Injectable({
  providedIn: 'root'
})

export class MusicPlayerService {

  mainSound: any;
  mixSound: any;
  sample: any[] = [];
  mainPause: number;
  sampPause: number[] = [];
  paused: boolean = false;
  startTimeOut: any[] = [];
  stopTimeOut: any[] = [];
  position: number = 0;
  wasPlaying: boolean[] = [];


  constructor(private musicDataService: MusicDataService) { }

  play(music: Music) {
    if (this.paused == true) {
      this.mainSound.seek(this.mainPause);
      this.mainSound.play();
      for (let i in this.sample) {
        if (this.wasPlaying[i] == true) {
          this.sample[i].seek(this.sampPause[i])
          this.sample[i].play();
        }
        else {
          setTimeout(() => {
            this.sample[i].play()
          }, (music.samples[i].start * 1000 - this.mainPause * 1000));
        }
        setTimeout(() => {
          this.sample[i].stop()
        }, (music.samples[i].start * 1000 + music.samples[i].duration * 1000 - this.mainPause * 1000));
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
      this.mainSound.play();
      this.mainSound.mute(music.mainTitle.mute)
      this.mainSound.on('end', () => { this.musicDataService.isPaused(false) });
      setInterval(() => { this.musicDataService.position(this.mainSound.seek()) }, 100);

      if (music.samples != undefined) {
        for (let i in music.samples) {
          this.sample[i] = new Howl({
            src: [music.samples[i].url],
            html5: true,
            loop: true,
            volume: Number([music.samples[i].volume]),
            rate: music.samples[i].rate,
          });
          this.sample[i].mute(music.samples[i].mute)
          this.startTimeOut[i] = setTimeout(() => {
            this.sample[i].play()
          }, (music.samples[i].start * 1000));
          this.stopTimeOut[i] = setTimeout(() => {
            this.sample[i].stop()
          }, (music.samples[i].start * 1000 + music.samples[i].duration * 1000));
        }
      }
    }
  }

  playMix(mixUrl: any) {
    this.mixSound = new Howl({
      src: [mixUrl],
      html5: true,
      volume: 1,      
    });
    this.mixSound.play();
  }

  pause() {
    this.paused = true;
    this.mainSound.pause();
    this.mainPause = this.mainSound.seek();
    for (let i in this.sample) {
      if (this.sample[i].playing()) {
        this.sample[i].pause();
        this.sampPause[i] = this.sample[i].seek();
        clearTimeout(this.stopTimeOut[i]);
        this.wasPlaying[i] = true;
      }
      else {
        clearTimeout(this.startTimeOut[i]);
        this.wasPlaying[i] = false;
      }
    }
  }

  stop() {
    this.paused = false
    this.musicDataService.isPaused(false);
    if (this.mainSound.playing()) this.mainSound.stop();
    for (let i in this.sample) {
      if (this.sample[i].playing()) {
        this.sample[i].stop()
      }
      else if (this.sample[i].state() == "loaded") {
        clearTimeout(this.startTimeOut[i])
      }
    }
  }

  stopMix() {
    this.mixSound.stop();
  }

  setMainVolume(volume) {
    this.mainSound.volume(volume);
  }

  setSampleVolume(i, volume) {
    if (volume != undefined) {
      this.sample[i - 1].volume(volume)
    }
  }

  mute(i) {
    i == 0 ? this.mainSound.mute(true) : this.sample[i - 1].mute(true)
  }

  unmute(i) {
    i == 0 ? this.mainSound.mute(false) : this.sample[i - 1].mute(false)
  }

  setRate(i, rate) {
    i == 0 ? this.mainSound.rate(rate) : this.sample[i - 1].rate(rate)
  }

  forward(sec: number, music: Music) {
    var forSample: number[] = [];
    var forMainSound = this.mainSound.seek();
    this.mainSound.stop();
    this.mainSound.seek(forMainSound + sec);
    this.mainSound.play();
    for (let i in this.sample) {
      if (this.sample[i].playing()) {
        forSample[i] = this.sample[i].seek();
        this.sample[i].seek(forSample[i] + sec);
        this.sample[i].play();
        setTimeout(() => {
          this.sample[i].stop()
        }, (music.samples[i].duration * 1000 - forSample[i] * 1000 - sec * 1000));
      }
      else if (forMainSound + sec < music.samples[i].start) {
        clearTimeout(this.startTimeOut[i])
        this.startTimeOut[i] = setTimeout(() => {
          this.sample[i].play()
        }, (music.samples[i].start * 1000 - forMainSound * 1000 - sec * 1000));
        this.stopTimeOut[i] = setTimeout(() => {
          this.sample[i].stop()
        }, (music.samples[i].start * 1000 + music.samples[i].duration * 1000 - forMainSound * 1000 - sec * 1000));
      }
      else {
        var diff = forMainSound + sec - music.samples[i].start
        clearTimeout(this.startTimeOut[i])
        this.startTimeOut[i] = setTimeout(() => {
          this.sample[i].seek(diff);
          this.sample[i].play();
        }, (music.samples[i].start * 1000 - forMainSound * 1000 - sec * 1000));
        this.stopTimeOut[i] = setTimeout(() => {
          this.sample[i].stop()
        }, (music.samples[i].start * 1000 + music.samples[i].duration * 1000 - forMainSound * 1000 - sec * 1000));
      }
    }
  }
}
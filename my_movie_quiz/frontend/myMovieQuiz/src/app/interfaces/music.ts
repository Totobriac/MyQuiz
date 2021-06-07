export interface Music {
  mainTitle: {
    title: string;
    url: string;
    volume: number;
    rate: number;
    mute: boolean;};
  samples: [{
    name: string;
    themeDuration: number;
    duration: number;
    url: string;
    start: number;
    volume: number;
    rate: number;
    position: number;
    mute: boolean;
  }];
  currentTrack: number;
  isPaused: boolean;
  position: number;
}

export interface MusicCard {
  card: string;
}
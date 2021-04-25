export interface Music {
  mainTitle: {
    title: string;
    url: string;
    volume: number};
  samples: [{
    name: string;
    duration: number;
    url: string;
    start: number;
    volume: number;
  }]
}
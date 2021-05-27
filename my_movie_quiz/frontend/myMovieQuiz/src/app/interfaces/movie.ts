export class MovieDb {
  backdrop: any;
  id: number;
  poster: any;
  title: string;
  year: any;
  plot: string;
  trailer: any;
  cast: { name: string;
           character: string;
           profile_path: string;  
  }[];
  music_composer: string;

  constructor(backdrop: any, id: number, poster: any, title: string, year: any, plot: string, 
              trailer: any, cast: { name: string; character: string; profile_path: string}[], music_composer: string) {
    this.backdrop = backdrop;
    this.title = title;
    this.id = id;
    this.poster = poster;
    this.year = year;
    this.plot = plot;
    this.trailer = trailer;
    this.cast = cast;
    this.music_composer = music_composer;
  }
}


export interface AutoResponse {
  data: string;
  id: number;
  url: any;
  name: any;
  backdrop: any;
  plot: string;
  year: any;  
}

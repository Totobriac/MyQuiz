export interface MovieDb {
  backdrop: any;
  id: number;
  poster: any;
  title: string;
  year: any;
  plot: string;
  trailer: any;
  cast: [{ name: string;
           character: string;
           profile_path: string;  
  }];
  music_composer: string;
}

export interface MovieAuto {
  id: number;
  poster: any;
}

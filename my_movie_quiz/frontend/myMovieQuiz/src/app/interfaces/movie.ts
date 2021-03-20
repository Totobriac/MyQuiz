import { Url } from "url";

export interface Movie {
  cast: [{ actor: string;
           actor_id: number;
           character: string;
        }];
  id: any;
  plot: string;
  title: string;
  trailer: { id: any;
             link: Url;
           };
  year: number;
}

export interface MovieDb {
  backdrop: any;
  id: number;
  poster: any;
  title: string;
  year: any;
}

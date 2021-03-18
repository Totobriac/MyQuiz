import { Component, OnInit,} from '@angular/core';
import { MovieDb } from '../interfaces/movie';
import { SearchMovieService } from './search-movie.service';
import { MovieDataService } from "../services/movie-data.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  value: any

  constructor( private searchMovieService: SearchMovieService,
               private data: MovieDataService ) { }

  ngOnInit(): void {
  }

  submitForm(movie: string) {
    console.log(movie)      
    this.searchMovieService.searchMovies(movie)       
    .subscribe((r: MovieDb[]) => { r.sort(function(a,b){
                                  var c: any = new Date(a.year);
                                  var d: any = new Date(b.year);
                                  return c-d;
                                  });
                                  this.data.changeMovieList(r)
                                  console.log(r)})                                                        
  }
}

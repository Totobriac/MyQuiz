import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SearchMovieService } from './search-movie.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() movieList = new EventEmitter()
  
  value: any

  constructor( private searchMovieService : SearchMovieService ) { }

  ngOnInit(): void {
  }

  submitForm(movie: string) {
    console.log(movie)      
    this.searchMovieService.searchMovies(movie)       
    .subscribe((r:any) => { r.sort(function(a,b){
                              var c: any = new Date(a.year);
                              var d: any = new Date(b.year);
                              return c-d;
                            });
                            this.movieList.emit(r)
                            console.log(r)})                                                        
  }
}

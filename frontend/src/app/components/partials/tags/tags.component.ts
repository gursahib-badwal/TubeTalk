import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Output() filterYear: EventEmitter<any[]> = new EventEmitter();
  @Output() filterGenre: EventEmitter<any[]> = new EventEmitter();
  @Input() moviesTags: any[] = [];
  @Input() genresInfo: any[] = [];
  @Input() tagName: string = '';
  selectedGenres: string = '';
  tags?:Tag[];
  years?:any[] = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
    2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992
  ]

  constructor(public movieService:MovieService, private router: Router,) {}

  ngOnInit(): void {}
 
  ngOnChanges() {
    if(this.moviesTags?.length > 0){
      this.moviesTags[0].name = 'Latest'; 
    }
    this.tags = this.moviesTags;
    this.genresInfo = this.genresInfo.filter((genres: any)=> genres.name !== this.selectedGenres);
  }

  test(name: any){
    if(this.selectedGenres !== name){
      this.selectedGenres = '';
    }
  }

  onChange(event: any) {
    const searchBox: any = document.getElementById("search_input");
    if(searchBox.value || this.router.url?.startsWith("/search")){
      this.filterGenre.emit(event.target.value);
    }else{
      this.selectedGenres = '';
      this.router.navigate([`tag/${event.target.value}`]);
      this.selectedGenres = event.target.value;
    }
  }

  setYear(event: any){
    this.filterYear.emit(event.target.value);
  }
}

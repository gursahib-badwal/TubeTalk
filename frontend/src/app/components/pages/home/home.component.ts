import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { Movie } from 'src/app/shared/models/Movie';
import { TvShows } from 'src/app/shared/models/TvShows';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  movies: Movie[] = [];
  allTvShows: TvShows[] = [];
  allContentShow: any[] = [];
  allContentMovies: any[] = [];
  allContentCoun: number = 0;
  tvShowsTag: any[] = [];
  genresInfo: any[] = [];
  allMovies:any[] = []
  moviesTags: any[] = [];
  constructor(public movieservice:MovieService, public tvShowservice: TvShowsService, activatedRoute:ActivatedRoute, private router:Router) {
    let moviesObservable:Observable<Movie[]>;
    activatedRoute.params.subscribe((params) => {
      const test: any = document.getElementById('search_input')
      if(params.searchTerm) {
        moviesObservable = this.movieservice.getAllMoviesBySearchTerm(params.searchTerm);
        this.setMoviesResults(moviesObservable, params);
      }else if(params.tag === 'Latest') {
        moviesObservable = this.movieservice.getAllMovies();
        this.setMoviesResults(moviesObservable, params);
      }else {
        moviesObservable = this.movieservice.getAllMovies();
        this.setMoviesResults(moviesObservable, params, true);
      }
      this.getAllSaveContent(params, params.tag === 'Saved');
    });
  }

  getAllSaveContent(params: any, saved: boolean = false){
    let contentMovies: any[] = [];
    let contentTvShows: any[] = [];
    const userId = localStorage.getItem("currentUserId");
    
    if(userId){
      this.movieservice.getAllSavedContent(userId).subscribe((contentInfo: any)=>{
        if(contentInfo.content && contentInfo.content?.length > 0){
          contentInfo.content.forEach((contentUser: any)=>{
            if(contentUser.name === 'movie'){
              const contentMovie = this.movieservice.getMovieByID(contentUser.contentId, true)
              contentMovie.subscribe((contentMovie: any)=>{
                contentMovies.push(contentMovie.movies);
                this.allContentMovies = contentMovies;
                if(saved){
                  this.movies = contentMovies;
                }
              })
            }
            else if(contentUser.name === 'tvShow'){
              const contenShow = this.tvShowservice.getTvShowByID(contentUser.contentId);
              contenShow.subscribe((contentTvshow: any)=>{
                contentTvShows.push(contentTvshow.tvShows);
                this.allContentShow = contentTvShows;
              })
            }
          })
        }
       });
      }

    setTimeout(() => {
      if(saved){
        this.getAllGenresRecords(params);
      }else{
        this.setMoviesTagsCount(params)
      }
    }, 1000);
    
  }

  ngOnInit(): void {
  }

  getAllTvShowsRecord(params: any){
    let tvShowsObservable:Observable<any[]>;
    if(params.searchTerm) {
      tvShowsObservable = this.tvShowservice.getAllTvShowsBySearchTerm(params.searchTerm);
    }else if(params.tag === 'Latest') {
      tvShowsObservable = this.tvShowservice.getAllTvShows();
    }
    else {
      tvShowsObservable = this.tvShowservice.getAllTvShows();
    }
    tvShowsObservable.subscribe((tvShowsInfo: any)=>{
      this.allTvShows = tvShowsInfo?.tvShows?.results;
      this.allTvShows?.forEach((tvShow: any)=>{
        tvShow.genre_ids?.forEach((gen: any, index: number)=> {
          let genresObj = this.genresInfo?.find((genresName)=> genresName.id === gen)
          if(genresObj){
            tvShow.genre_ids[index] = genresObj?.name;
          }
        })
      })
      this.tvShowsTag = [...this.allTvShows];
      this.setMoviesTagsCount(params);
    })
  }

  setMoviesResults(moviesObservable: Observable<Movie[]> , params: any, tag: boolean= false){
    moviesObservable.subscribe((serverMovies: any) => {
      this.movies = serverMovies?.movies?.results ? serverMovies.movies.results : serverMovies;
      this.getAllGenresRecords(params, tag);
    })
  }
  filterYear(event: any){
    if(event){
      this.movies = this.allMovies.filter((movie: any)=> movie.release_date?.toString()?.split("-")[0]?.toString() === event?.toString());
      this.allTvShows = this.tvShowsTag.filter((tvShow: any)=> tvShow?.first_air_date?.toString()?.split("-")[0]?.toString() === event?.toString());
    }else{
      this.movies = this.allMovies;
      this.allTvShows = this.tvShowsTag;
    }
  }

  filterGenre(event: any){
    if(event){
      this.movies = this.allMovies.filter((movie: any)=> movie.genre?.toString()?.includes(event?.toString()));
      this.allTvShows = this.tvShowsTag.filter((tvShow: any)=> tvShow?.genre_ids?.toString()?.includes(event?.toString()));
    }else{
      this.movies = this.allMovies;
      this.allTvShows = this.tvShowsTag;
    }
  }
  
  getAllGenresRecords(params: any, tag: boolean= false){
   let genresObservable = this.movieservice.getAllGenres();
   genresObservable.subscribe((genres: any)=>{
    this.genresInfo = genres?.genres?.genres;
    this.getAllTvShowsRecord(params);
    this.movies?.forEach((movie: any)=>{
      movie.genre_ids?.forEach((gen: any, index: number)=> {
        let genresObj = this.genresInfo?.find((genresName)=> genresName.id === gen)
        movie.genre_ids[index] = genresObj?.name;
      })
      movie['name'] = movie.name ? movie.name : movie.title;
      movie['imageUrl'] = movie.imageUrl ? movie.imageUrl : movie.poster_path;
      movie['genre'] = movie.genre ? movie.genre : movie.genre_ids ? movie.genre_ids : movie.genres;
    })
    this.allMovies = [...this.movies];
    if(tag && params.tag){
      this.movies = this.setMoviesGenre(this.movies, params.tag);
    }
   })
  }

  setMovieGenresTitle(genre: any){
    return genre.name ? genre.name : genre;
  }

  setMoviesTagsCount(params: any){
    this.movieservice.getAllTags().subscribe((serverTags) => {
      if(localStorage.getItem("currentUserId")){
        serverTags.push({name: "Saved", count: 0})
      }
      
      if(serverTags?.length > 0){
        serverTags?.forEach((tag: any)=>{
          if(tag.name === 'All'){
            tag.count = this.allMovies?.length + this.tvShowsTag?.length;
          }else if(tag.name === 'Saved'){
            tag.count = this.allContentMovies.length + this.allContentShow?.length;
          }else{
            tag.count = this.allMovies?.filter((movie)=> movie?.genre?.toString()?.includes(tag.name))?.length + this.tvShowsTag?.filter((tvShow)=> tvShow?.genre_ids?.toString()?.includes(tag.name))?.length;
          }
        })
        this.moviesTags = serverTags;
      }
      if(params.tag === 'Saved'){
        this.allContentShow.forEach((tvShow: any)=>{
          tvShow['genre_ids'] = tvShow?.genre_ids ? tvShow?.genre_ids : tvShow.genres 
        })
        this.allTvShows = this.allContentShow;
      }else if(params.tag !== 'Latest' && params.tag){
        this.allTvShows = this.setTvShowsGenre(this.allTvShows, params.tag);
      }
    });
  }

  setTvShowGenresTitle(genres: any){
    return genres?.name ? genres.name : genres;
  }
  
  setMoviesGenre(movies: any[], tag: string = ''){
    return movies.filter((movie)=> movie?.genre?.toString()?.includes(tag));
  }

  setTvShowsGenre(tvShows: any[], tag: string = ''){
    return tvShows.filter((tvShow)=> tvShow?.genre_ids?.toString()?.includes(tag));
  }
}
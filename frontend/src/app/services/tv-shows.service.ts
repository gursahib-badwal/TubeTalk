import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ALL_TV_SHOW_URL, API_TVSHOW_BY_ID_URL, TVSHOW_BY_SEARCH_URL } from '../shared/constants/urls';
import { TvShows } from '../shared/models/TvShows';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  constructor(private http:HttpClient) { }

  getAllTvShows():Observable<TvShows[]> {
    return this.http.get<TvShows[]>(ALL_TV_SHOW_URL);
  }

  getTvShowByID(movieId:string):Observable<TvShows> {
    return this.http.get<TvShows>(API_TVSHOW_BY_ID_URL + movieId)
  }

  getAllTvShowsBySearchTerm(searchTerm:string) {
    return this.http.get<TvShows[]>(TVSHOW_BY_SEARCH_URL + searchTerm);
  }
}

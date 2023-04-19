import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ALL_GENRES, ALL_MOVIES_URL, API_MOVIES_BY_ID_URL, GET_ALL_SAVED_CONTENT, LATEST_MOVIES_URL, MOVIES_BY_ID_URL, MOVIES_BY_SEARCH_URL, MOVIES_BY_TAG_URL, MOVIES_TAGS_URL, MOVIES_URL } from '../shared/constants/urls';
import { Movie } from '../shared/models/Movie';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Movie[]> {
    return this.http.get<Movie[]>(MOVIES_URL);
  }

  getAllMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>(ALL_MOVIES_URL);
  }

  getAllGenres():Observable<any[]> {
    return this.http.get<Movie[]>(ALL_GENRES);
  }

  getLatestMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>(LATEST_MOVIES_URL);
  }

  getAllMoviesBySearchTerm(searchTerm:string) {
    return this.http.get<Movie[]>(MOVIES_BY_SEARCH_URL + searchTerm);
  }

  getAllTags():Observable<Tag[]> {
    return this.http.get<Tag[]>(MOVIES_TAGS_URL);
  }

  getAllMoviesByTag(tag:string):Observable<Movie[]> {
    return tag == "All"?
    this.getAll():
    this.http.get<Movie[]>(MOVIES_BY_TAG_URL + tag);
  }

  getMovieByID(movieId:string, api: boolean = false):Observable<Movie> {
    return this.http.get<Movie>(api ? API_MOVIES_BY_ID_URL + movieId : MOVIES_BY_ID_URL + movieId);
  }

  getAllSavedContent(id:any):Observable<Movie> {
    return this.http.get<Movie>(GET_ALL_SAVED_CONTENT + id);
  }

  SavedContent(body: any):Observable<Movie> {
    return this.http.post<Movie>(GET_ALL_SAVED_CONTENT, body);
  }

  removeContentMovie(contentId: any):Observable<Movie> {
    return this.http.delete<Movie>(GET_ALL_SAVED_CONTENT + contentId);
  }
}

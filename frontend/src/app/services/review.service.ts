import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../shared/models/Review';
import { Observable } from 'rxjs';
import { REVIEW_ADD_URL, REVIEW_DELETE_URL, REVIEW_URL } from '../shared/constants/urls';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    
    constructor(private http: HttpClient) { }

    getReviews(contentId: string):Observable<Review[]>{ 
        return this.http.get<Review[]>(REVIEW_URL + contentId);
    }

    postReviews(review: Review):Observable<Review[]>{
        return this.http.post<Review[]>(REVIEW_ADD_URL, review);
    }

    deleteReviews(reviewId: string):Observable<Review[]>{
        return this.http.delete<Review[]>(REVIEW_DELETE_URL + reviewId);
    }

}

//when we'll be on a specific movie page, movie page component.ts file, we'll the run function 
// get_reviews ( ){
//     getReviews("here we will give it the content id of the movie on which we are tryint to comment on")
// }

// delete_reviews ( ){
//     delete_reviews("here we will give it the review id of the movie on which we are tryint to delete")
// }



import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { UserService } from 'src/app/services/user.service';
import { Review } from 'src/app/shared/models/Review';
import { TvShows } from 'src/app/shared/models/TvShows';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-tv-show-page',
  templateUrl: './tv-show-page.component.html',
  styleUrls: ['./tv-show-page.component.css']
})
export class TvShowPageComponent {
  // tvShow!: TvShows;
  tvShowInfo!: TvShows;
  comments: string[] = [];
  newComment: string = '';

  reviews_array: Review[] = [{ reviewId: "", rating: "23", comment: "blah blah blah", contentId: "", userId: "", userName: ""}];
  temp_review: any = { reviewId: "", rating: 0, comment: "", contentId: "", userId: "", userName: ""}

  constructor(activatedRoute: ActivatedRoute, tvShowService: TvShowsService, public movieService: MovieService, public reviewService: ReviewService, public userService: UserService) {
    let tvShowObservable:Observable<any>;
    activatedRoute.params.subscribe((params) => {
      if (params.id){
        tvShowObservable = tvShowService.getTvShowByID(params.id);
        tvShowObservable.subscribe(serverTvShow => {

          this.tvShowInfo = serverTvShow.tvShows;
          this.get_reviews(this.tvShowInfo.id);
        // Load comments from localStorage
        const storedComments = localStorage.getItem(this.tvShowInfo.name);
        if (storedComments) {
          this.comments = JSON.parse(storedComments);
          this.get_reviews(this.tvShowInfo.id);
        }

        if(localStorage.getItem("currentUserId")){
          this.movieService.getAllSavedContent(localStorage.getItem("currentUserId")).subscribe((allContents: any)=>{
            if(allContents.content){
              const allSaveContent = allContents.content;
              const savedTvShow = allSaveContent.some((content: any)=> content.contentId?.toString() === this.tvShowInfo.id?.toString() && content.name === "tvShow");
              // localStorage.removeItem(this.tvShowInfo.id);
              if(savedTvShow){
                this.tvShowInfo['favorite'] = true;
              }
            }
          })
        }
        });
      }
    })
  }

  setMovieTag(tag: any){
    return tag?.name ? tag.name : tag;
  }

  addfavTvShow(tvShow: any){
    let userId = localStorage.getItem("currentUserId");
    if(userId){
      let body = {name: "tvShow",
      yearOfRelease: tvShow.first_air_date ? tvShow.first_air_date?.toString().split("-")[0] : null,
      genre: "drama", contentId: tvShow.id, userId: userId};
    if(tvShow.favorite){
      this.movieService.getAllSavedContent(localStorage.getItem("currentUserId")).subscribe((allContents: any)=>{
        if(allContents.content){
          const allSaveContent = allContents.content;
          const index = allSaveContent.findIndex((content: any)=> content.contentId?.toString() === tvShow.id?.toString() && content.name === "tvShow");
          if(index > -1){
            this.movieService.removeContentMovie(allSaveContent[index]._id).subscribe((res: any)=>{
              tvShow['favorite'] = false;
            });
          }
        }
      })
    }else{
      this.movieService.SavedContent(body).subscribe((res: any)=>{
        tvShow['favorite'] = true;
      });
    }
    }
  }
  get_reviews(contentId: string){
    this.reviewService.getReviews(contentId).subscribe((data: any) => {
      this.reviews_array = data;
      console.log(this.reviews_array);
    })
  }

  submit_review(){
    if(this.userService.getUserEmail() == null){
      //alert("Please login to submit a review");
      window.location.href = 'login';
      return;
    }
    else {

      if(this.temp_review.rating < 0 || this.temp_review.rating > 10){
        alert("Please enter a value between 0 and 10 inclusive");
        return;
      }
      else {
        this.temp_review.reviewId = uuidv4();
        this.temp_review.contentId = this.tvShowInfo.id;
        this.temp_review.userName = this.userService.getUserName();
        this.temp_review.userId = this.userService.getUserEmail();
        this.temp_review.rating = this.temp_review.rating.toString();
        this.reviewService.postReviews(this.temp_review).subscribe({
          next: (result: any) => {
            console.log(result);
            },
            error: (err: any) => {
            console.log(err);
            },
            complete: () => {
            console.log('complete');
            }
        }
        );
        this.get_reviews(this.tvShowInfo.id);

        this.temp_review.reviewId = "";
        this.temp_review.contentId = "";
        this.temp_review.userName =   "";
        this.temp_review.userId = "";
        this.temp_review.rating = 0;
        this.get_reviews(this.tvShowInfo.id);
        var textarea = document.getElementById('note_heading') as HTMLInputElement;
        // input.setAttribute('value', '0');
        textarea.value = '';
        // window.location.reload();
      }

    }

  }

  delete_review(reviewId : string, userId:string){
    if (userId == this.userService.getUserEmail()){
      this.reviewService.deleteReviews(reviewId).subscribe({
        next: (result: any) => {
          console.log(result);
          },
          error: (err: any) => {
          console.log(err);
          },
          complete: () => {
          console.log('complete');
          }
      }
      );
      // window.location.reload();
      this.get_reviews(this.tvShowInfo.id);
    }

    else {
      // this.visible = false;
      console.log("You are not authorized to delete this review");
    }
    this.get_reviews(this.tvShowInfo.id);
  }

  checker(){
    return this.userService.getUserEmail();
  }
}

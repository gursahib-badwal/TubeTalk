import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/models/Movie';
import { Review } from 'src/app/shared/models/Review';
import { ReviewService } from 'src/app/services/review.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{
  movie!: Movie;
  newComment: string = '';
  comments: string[] = [];
  allSaveContent: any[] = [];
  apiMovie: boolean = false;
  loginUrl = 'login';
  // visible: boolean = true;


  reviews_array: Review[] = [{ reviewId: "", rating: "23", comment: "blah blah blah", contentId: "", userId: "", userName: ""}];
  temp_review: any = { reviewId: "", rating: null, comment: "", contentId: "", userId: "", userName: ""}

  constructor(activatedRoute: ActivatedRoute, public movieService: MovieService, public reviewService: ReviewService, public userService: UserService, private router:Router) {
    let moviesObservable:Observable<any>;
    activatedRoute.params.subscribe((params) => {
      var numbers = /^[0-9]+$/;
      if(params.id.match(numbers)){
        moviesObservable = movieService.getMovieByID(params.id, true);
        this.apiMovie = true;
      }else{
        moviesObservable = movieService.getMovieByID(params.id);
        this.apiMovie = false;
      }

      moviesObservable.subscribe(serverMovie => {
        if(serverMovie?.movies){
          serverMovie.movies['imageUrl']= serverMovie?.movies?.poster_path;
          serverMovie.movies['name']= serverMovie?.movies?.title;
          serverMovie.movies['genre']= serverMovie?.movies?.genres;
          this.movie = serverMovie.movies;
          this.get_reviews(this.movie.id);
        }else{
          this.movie = serverMovie;
          this.get_reviews(this.movie.id);
        }

        // Load comments from localStorage
        const storedComments = localStorage.getItem(this.movie.name);
        if (storedComments) {
          this.comments = JSON.parse(storedComments);
        }
        // Load favorite movie from localStorage
        if(localStorage.getItem("currentUserId")){
          this.movieService.getAllSavedContent(localStorage.getItem("currentUserId")).subscribe((allContents: any)=>{
            if(allContents.content){
              const allSaveContent = allContents.content;
              const savedMovie = allSaveContent.some((content: any)=> content.contentId?.toString() === this.movie.id?.toString() && content.name === "movie");
              if(savedMovie){
                this.movie['favorite'] = true;
              }
            }
          })
        }
        this.get_reviews(this.movie.id);
      });
    });
  }

  setMovieTag(tag: any){
    return tag?.name ? tag.name : tag;
  }

  ngOnInit(): void {

    // this.get_reviews(this.movie.id);
  }

  movieLink(movie: any){
    var a = document.createElement('a')
    // Set the href property.
    a.href = movie.homepage;
    a.target = 'blank'
    // Append the anchor element to the body.
    document.body.appendChild(a);
    a.click();
  }

  setFaceBookLink(movie: any){
    var a = document.createElement('a')
    a.href = `https://www.facebook.com/sharer/sharer.php?title=${movie.original_title ? movie.original_title.toString()?.replaceAll(" ", '-') : ''}`;
    a.target = 'blank'
    document.body.appendChild(a);
    a.click();
  }

  setTwitterLink(movie: any){
    var a = document.createElement('a')
    a.href = `https://twitter.com/intent/tweet?source=tweetbutton&text=${movie.original_title ? movie.original_title.toString()?.replaceAll(" ", '-') : ''}`;
    a.target = 'blank'
    document.body.appendChild(a);
    a.click();
  }

  // onSubmit() {
  //   if (this.newComment.trim() !== '') {
  //     // Add the new comment to the list and save it to localStorage
  //     this.comments.push(this.newComment);
  //     localStorage.setItem(this.movie.name, JSON.stringify(this.comments));
  //     this.newComment = '';
  //   }
  // }

  // onDelete(index: number) {
  //   this.comments.splice(index, 1);
  //   localStorage.setItem(this.movie.name, JSON.stringify(this.comments));
  // }

  addMovieFav(movie: any){
    console.log('movie: ', movie);
    let userId = localStorage.getItem("currentUserId");
    if(userId){
      let body = {name: "movie",
      yearOfRelease: movie.release_date ? movie.release_date?.toString().split("-")[0] : null,
      genre: "Action", contentId: this.movie.id, userId: userId};
    if(movie.favorite){
      this.movieService.getAllSavedContent(localStorage.getItem("currentUserId")).subscribe((allContents: any)=>{
        if(allContents.content){
          const allSaveContent = allContents.content;
          const index = allSaveContent.findIndex((content: any)=> content.contentId?.toString() === movie.id?.toString() && content.name === "movie");
          console.log('index: ', index);
          if(index > -1){
            this.movieService.removeContentMovie(allSaveContent[index]._id).subscribe((res: any)=>{
              this.movie['favorite'] = false;
              // localStorage.removeItem(this.movie.id);
            });
          }
        }
      })
    }else{
      this.movieService.SavedContent(body).subscribe((res: any)=>{
        this.movie['favorite'] = true;
        // localStorage.setItem(this.movie.id, JSON.stringify(this.movie));
      });
    }
    }
  }
//this.movie will be used in get reviews
  get_reviews(contentId: string){
    this.reviewService.getReviews(contentId).subscribe((data: any) => {
      this.reviews_array = data;
      console.log(this.reviews_array);
    })
  }

  submit_review(){
    if(this.userService.getUserEmail() == null){
      //alert("Please login to submit a review");
      this.router.navigateByUrl(this.loginUrl);
      return;
    }
    else {

      if(this.temp_review.rating < 0 || this.temp_review.rating > 10){
        alert("Please enter a value between 0 and 10 inclusive");
        return;
      }
      else {
        this.temp_review.reviewId = uuidv4();
        this.temp_review.contentId = this.movie.id;
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
        this.get_reviews(this.movie.id);

        this.temp_review.reviewId = "";
        this.temp_review.contentId = "";
        this.temp_review.comment = "";
        this.temp_review.userName = "";
        this.temp_review.userId = "";
        this.temp_review.rating = null;
        this.get_reviews(this.movie.id);
        // var input = document.getElementById('floatingTextarea') as HTMLInputElement;
        var textarea = document.getElementById('note_heading') as HTMLInputElement;
        // input.setAttribute('value', '0');
        textarea.value = '';
        // window.location.reload();
        // this.router.navigate(['api/imdb/movie', this.movie.id]);
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
      this.get_reviews(this.movie.id);
    }

    else {
      // this.visible = false;
      console.log("You are not authorized to delete this review");
    }
    this.get_reviews(this.movie.id);
  }

  checker(){
    return this.userService.getUserEmail();
  }

}

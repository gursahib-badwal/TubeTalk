import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm = '';
  user!: User;
  constructor(activatedRoute:ActivatedRoute, private router:Router, private userService: UserService) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm
    });

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }
  ngOnInit(): void {
    setTimeout(() => {
      if(!this.isAuth){
        localStorage.removeItem('currentUserId');
      }else if (this.user._id){
        localStorage.setItem("currentUserId",  this.user._id);
      }
    }, 500);
  }
  
  search(term:string):void {
    if(term)
    this.router.navigateByUrl('/search/'+term);
  }

  logout(){
    localStorage.removeItem('currentUserId');
    this.userService.logout();
  }
  

  get isAuth() {
    return this.user && this.user.name;
  }
}

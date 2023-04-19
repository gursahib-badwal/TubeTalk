import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  user!: User;
  isEditingName = false;
  newName = '';
  constructor(private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }
  ngOnInit(): void {

  }

  startEditingName() {
    this.isEditingName = true;
    this.newName = this.user.name;
  }

  cancelEditingName() {
    this.isEditingName = false;
  }

  saveNewName() {
    this.user.name = this.newName;
    this.isEditingName = false;
  }
}

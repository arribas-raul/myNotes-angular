import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user: User;

  public menuItems :any = [];

  public screen_mobile = false;

  constructor(
    private userService: UserService) { 

    this.user = this.userService.user;
  }

  ngOnInit(): void {}
}

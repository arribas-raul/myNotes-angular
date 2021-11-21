import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /* public user: User; */

  public sidebar_hidden = false;

  constructor(private userService: UserService ) { 
    /* this.user = this.userService.user; */
  }


  ngOnInit(): void {

  }

  logout(){
    this.userService.logout()
    .subscribe(resp => {
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../@graphql/services/api.service';
import { AuthService } from '../../../@core/services/auth.service';
import { UsersService } from '../../../@core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private users: UsersService) { }

  ngOnInit(): void {

    /*this.users.getUsers().subscribe(result => {
      console.log(result);
    });
    this.auth.getMe().subscribe(result => {
      console.log(result);
    });*/
  }

}

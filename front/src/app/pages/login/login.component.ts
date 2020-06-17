import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;

  constructor(public auth: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.auth.errors = [];
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['index']);
    }
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.auth.login({'username': this.user.username, 'password': this.user.password}).subscribe(
      data => {
        this.auth.updateData(data['token']);
        this.router.navigate(['index']);
      },
      err => {
        this.auth.errors = err['error'];
      });
  }

  refreshToken() {
    this.auth.refreshToken();
  }

  logout() {
    this.auth.logout();
  }

}

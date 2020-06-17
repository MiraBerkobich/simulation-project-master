import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public user: any;

  constructor(public auth: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.auth.errors = [];
    this.user = {
      username: '',
      email: '',
      password: ''
    };
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['index']);
    }
  }

  registration() {
    this.auth.registration(this.user).subscribe(
      user => {
        this.auth.login(this.user).subscribe(
      data => {
        this.auth.updateData(data['token']);
        this.router.navigate(['index']);
      },
      err => {
        this.auth.errors = err['error'];
      }
    );
      },
      err => {
        this.auth.errors = err['error'];
      }
    );
  }
}

import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

const api: string = environment.server;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private httpOptions: any;
  public errors: any = [];
  public token: string;
  public token_expires: Date;
  public username: string;
  public is_registered = false;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  public login(user) {
    this.errors = [];
    return this.http.post(`${api}/api-token-auth/`, JSON.stringify(user), this.httpOptions)
  }
  public registration(user) {
    this.errors = [];
    return this.http.post(`${api}/reg/`, JSON.stringify(user), this.httpOptions)
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(`${api}/api-token-refresh/`, JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    localStorage.removeItem('u_token');
  }

  public  updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    localStorage.setItem('u_token', token)
  }

   public isAuthenticated(): boolean {
    const token = localStorage.getItem('u_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUser(){
    const token = localStorage.getItem('u_token');
    return this.jwtHelper.decodeToken(token)
  }
}

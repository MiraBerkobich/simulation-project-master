import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const api: string = environment.server;

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private httpOptions: any;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('u_token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      })
    };
  }

  getRatings(project_id){
    return this.http.get(`${api}/rating/${project_id}/`)
  }

  createRating(rating, project_id){
    return this.http.post(`${api}/rating/${project_id}/`, JSON.stringify({'rating': rating}), this.httpOptions)
  }

}

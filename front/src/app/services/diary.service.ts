import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const api: string = environment.server;

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private httpOptions: any;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('u_token');
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': 'JWT ' + token})
    };
  }

  getDiary(user_id){
    return this.http.get(`${api}/diary_user/${user_id}/`)
  }

  createDiaryRecord(record, user_id){
    return this.http.post(`${api}/diary_user/${user_id}/`, JSON.stringify(record), this.httpOptions)
  }
}

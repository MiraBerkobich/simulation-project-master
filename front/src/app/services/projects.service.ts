import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const api: string = environment.server;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  mainProject: any;
  deadline = 7;
  deadlines = [7, 14, 21];
  userCounterQuestionsForProject = 0;

  constructor(private http: HttpClient) { }

  getProjects(){
    return this.http.get(`${api}/projects/`)
  }
}

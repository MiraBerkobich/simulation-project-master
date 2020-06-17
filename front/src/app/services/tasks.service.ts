import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {QuestionsService} from "./questions.service";
import {CompleteTasksCounterService} from "./complete-tasks-counter.service";

const api: string = environment.server;

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  user_tasks = [];

  constructor(private http: HttpClient, public completeTasksSrv: CompleteTasksCounterService) { }

  getTasks(projectId){
    return this.http.get(`${api}/tasks/${projectId}/`)
  }

  getTaskStatus(task:any): number {
    let status = 1; // задача не решена
    let task_questions_ids = task.questions.map(e => {return e.id});
    let resolved_ids = this.completeTasksSrv.complete_questions_ids.filter(e => { return task_questions_ids.indexOf(e) >= 0});
    if(task_questions_ids.length === resolved_ids.length) status = 2; // решена
    if(task_questions_ids.length > resolved_ids.length && resolved_ids.length > 0) status = 3; // в процессе
    if(resolved_ids.length === 0 && task_questions_ids.length > 0 ) status = 1; // новая
    return status;
  }

  getStatusString(status: number): string{
    let status_string: string;
    switch (status) {
      case 1: status_string = 'Новая'; break;
      case 2: status_string = 'Решена'; break;
      case 3: status_string = 'В процессе'; break;
      default: status_string = 'Новая';
    }

    return status_string;
  }
}

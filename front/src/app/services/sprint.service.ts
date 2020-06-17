import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TasksService} from "./tasks.service";

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  sprint = 1;
  clientLock = true;
  teamLock = true;
  public sprintConfig = new Subject<number>();
  constructor(public taskSrv: TasksService) {
  }

  emitSprint(val) {
      this.sprintConfig.next(val);
  }

  nextSprint(){
    this.sprint += 1;
    this.emitSprint(this.sprint) ;
    this.taskSrv.user_tasks = [];
    this.clientLock = true;
    this.teamLock = true;
  }
}

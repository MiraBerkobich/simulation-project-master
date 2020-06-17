import {Injectable} from '@angular/core';
import {timer} from "rxjs";
import {ProjectsService} from "./projects.service";
import {Router} from "@angular/router";
import {SprintService} from "./sprint.service";

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  sprintTimer: string;
  timeLeft: number;
  myTimer: any;
  currentTime: number = 0;


  constructor(public projectsSrv: ProjectsService, public router: Router, public sprintSrv: SprintService) {
    this.timeLeft = this.getTimeLeft();
    this.observableTimer();
    this.sprintSrv.sprintConfig.subscribe(() => {
      this.myTimer.unsubscribe();
      this.timeLeft = this.getTimeLeft();
      this.observableTimer();
    });
  }

  getTimeLeft() {
    let timeLeft = 5 * 60;
    switch (this.projectsSrv.deadline) {
      case 14:
        timeLeft = 7 * 60;
        break;
      case 21:
        timeLeft = 10 * 60;
        break;
    }
    return timeLeft;
  }

  observableTimer() {
    this.myTimer = timer(1000, 2000).subscribe(val => {
      let sprintTimer = this.timeLeft - val;
      this.currentTime += 1;
     // console.log(this.timeLeft, this.currentTime)
      const minutes = Math.floor(sprintTimer / 60);
      const seconds = sprintTimer - minutes * 60;
      if (minutes <= 0) {
        this.router.navigate(['tasks']);
      }
      this.sprintTimer = `${("0" + minutes.toString()).slice(-2)}:${("0" + seconds.toString()).slice(-2)}`
    });
  }
}

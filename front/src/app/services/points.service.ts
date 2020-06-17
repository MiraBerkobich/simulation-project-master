import { Injectable } from '@angular/core';
import {ProjectsService} from "./projects.service";

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  deadlinePoints: number;
  budgetPoints: number;
  clientPoints: number;
  teamPoints: number;
  qualityPoints: number;

  userDeadline = 0;
  userBudget = 0;
  userClient = 0;
  userTeam = 0;
  userQuality = 0;

  constructor(public projectsSrv: ProjectsService) {
    this.deadlinePoints = projectsSrv.deadline + this.userDeadline;
  }

  getDeadline(){
    let deadline = 0;
    if(this.projectsSrv.deadline){
      deadline = this.projectsSrv.deadline + this.userDeadline
    }
    return deadline;
  }

  getBudgetPoints(){
    let budget = 0;
    if(this.projectsSrv.deadline){
      budget = 100 + this.userBudget;
    }
    return budget;
  }

  getClientPoints(){
    let points = 0;
    if(this.projectsSrv.deadline){
      switch (this.projectsSrv.deadline) {
        case 7: points = 10 + this.userClient; break;
        case 14: points = 8 + this.userClient; break;
        case 21: points = 6 + this.userClient; break;
      }
    }
    return points;
  }

  getTeamPoints(){
    let points = 0;
    if(this.projectsSrv.deadline){
      switch (this.projectsSrv.deadline) {
        case 7: points = 5 + this.userTeam; break;
        case 14: points = 7 + this.userTeam; break;
        case 21: points = 9 + this.userTeam; break;
      }
    }
    return points;
  }

  getQualityPoints(){
    let points = 0;
    if(this.projectsSrv.deadline){
      switch (this.projectsSrv.deadline) {
        case 7: points = 2 + this.userQuality; break;
        case 14: points = 4 + this.userQuality; break;
        case 21: points = 6 + this.userQuality; break;
      }
    }
    return points;
  }
}

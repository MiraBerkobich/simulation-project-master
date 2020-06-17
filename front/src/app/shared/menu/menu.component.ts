import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ProjectsService} from "../../services/projects.service";
import {SprintService} from "../../services/sprint.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public auth: AuthService,  public router: Router,
              private projectsSrv: ProjectsService, public sprintSrv: SprintService) {
  }

  ngOnInit() {
  }

  logoutClick() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  projectsClick() {
    if(this.projectsSrv.mainProject){
       this.router.navigate(['about-project']);
    } else {
      this.router.navigate(['projects']);
    }
  }

  sprintDisabled(){
    let disabled = true;
    if(this.sprintSrv.sprint > 1){
      disabled = false;
    }
    return disabled;
  }

  clientDisabled(){
    return this.sprintSrv.clientLock;
  }

  teamDisabled(){
    return this.sprintSrv.teamLock;
  }
}

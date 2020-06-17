import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any;

  constructor(private projectsSrv: ProjectsService, public router: Router) {
  }

  ngOnInit() {
    this.projectsSrv.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }


  setMainProject(p: any) {
    this.projectsSrv.mainProject = p;
    this.router.navigate(['about-project']);
  }
}

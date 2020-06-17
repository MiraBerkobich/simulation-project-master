import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-about-project',
  templateUrl: './about-project.component.html',
  styleUrls: ['./about-project.component.scss']
})
export class AboutProjectComponent implements OnInit {


  constructor(public projectsSrv: ProjectsService, public router: Router) { }


  ngOnInit() {

  }

}

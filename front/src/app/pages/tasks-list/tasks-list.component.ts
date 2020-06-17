import { Component, OnInit } from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {TasksService} from "../../services/tasks.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: any;
  mainProject: any;
  constructor(private projectsSrv: ProjectsService, public tasksSrv: TasksService, public hist: Location) { }

  ngOnInit() {
    this.getTasks();
  }

   getTasks() {
    this.mainProject = this.projectsSrv.mainProject;
    this.tasksSrv.getTasks(this.mainProject.id).subscribe(tasks => {
      this.tasks = tasks
    })
  }
   backClicked() {
    this.hist.back();
  }

}

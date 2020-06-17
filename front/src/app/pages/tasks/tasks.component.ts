import {Component, OnInit} from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: any;
  mainProject: any;

  constructor(private projectsSrv: ProjectsService, public tasksSrv: TasksService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.mainProject = this.projectsSrv.mainProject;
    this.tasksSrv.getTasks(this.mainProject.id).subscribe(tasks => {
      this.tasks = tasks
    })
  }

  private static removeElement(array, elem) {
    let index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  showTasks(e, id) {
    if (e.checked) {
        this.tasksSrv.user_tasks.push(id)
    } else {
        TasksComponent.removeElement(this.tasksSrv.user_tasks, id)
    }
    console.log(this.tasksSrv.user_tasks);
  }

  ifInTasks(id: any) {
    let checked = false;
    if(this.tasksSrv.user_tasks.indexOf(id) >=0 ) checked = true;
    return checked;
  }

  isDisabled(p: any) {
    let disabled = false;
    if(!p.questions.length) disabled = true;
    //if(this.tasksSrv.user_tasks.length >=3 ) disabled = true;
    if(this.tasksSrv.getTaskStatus(p) != 1) disabled = true;
    return disabled;
  }

  nextDisabled(){
    let disabled = false;
    if(this.tasksSrv.user_tasks.length < 1 ) disabled = true;
    return disabled;
  }
}

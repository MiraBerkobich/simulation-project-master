import {Component, OnInit} from '@angular/core';
import {SprintService} from "../../../../services/sprint.service";
import {MatDialog} from "@angular/material/dialog";
import {QuestionsService} from "../../../../services/questions.service";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  constructor(public sprintSrv: SprintService, public questionSrv: QuestionsService) {
  }

  ngOnInit() {
  }

  nextSprint() {
    this.sprintSrv.nextSprint();
  }
}

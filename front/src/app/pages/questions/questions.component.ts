import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../services/questions.service";
import {SprintService} from "../../services/sprint.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  meetingDisabled = false;

  constructor(public questionSrv: QuestionsService, public sprintSrv: SprintService) {
  }
  ngOnInit() {
    this.questionSrv.lockScreen();
    this.questionSrv.showQuestion = true;
    this.questionSrv.showNewSprintScreen = false;
    this.questionSrv.getQuestions();
  }

  unsetMeetingDisabled(e){
    this.meetingDisabled = e;
  }
}

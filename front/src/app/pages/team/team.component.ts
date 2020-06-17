import { Component, OnInit } from '@angular/core';
import {QuestionTeamService} from "../../services/question-team.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(public questionSrv: QuestionTeamService) { }

  ngOnInit() {
  }

}

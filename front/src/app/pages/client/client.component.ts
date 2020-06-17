import { Component, OnInit } from '@angular/core';
import {QuestionClientService} from "../../services/question-client.service";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(public questionSrv: QuestionClientService, public qSrv: QuestionsService) { }

  ngOnInit() {
  }

}

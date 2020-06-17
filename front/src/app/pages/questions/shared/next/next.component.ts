import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../../../services/questions.service";

@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnInit {

  constructor(public questionSrv: QuestionsService) { }

  ngOnInit() {
  }

}

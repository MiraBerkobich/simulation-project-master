import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {QuestionsService} from "../../../../services/questions.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  private dialogRefa: any;

  @Output() unlockMeeting = new EventEmitter();
  @ViewChild("failure", {'static': true}) dialogRef: TemplateRef<any>;


  constructor(public questionSrv: QuestionsService,  public dialog: MatDialog) { }

  ngOnInit() {

  }

  unlockMeetingClick(){
    this.unlockMeeting.emit(false)
  }

  checkPoints(){
    if (!this.questionSrv.checkPoints()) {
        this.failure();
    }
  }

  failure(): void {
    this.dialogRefa = this.dialog.open(this.dialogRef);
  }

  ok() {
    this.dialogRefa.close();
    window.location.href = '/';
  }
}



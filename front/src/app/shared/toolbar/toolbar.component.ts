import {Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ProjectsService} from "../../services/projects.service";
import {timer} from "rxjs";
import {Router} from "@angular/router";
import {TimerService} from "../../services/timer.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PointsService} from "../../services/points.service";


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  dialogRefa: any;
  @ViewChild("meeting", {'static': true}) dialogRef: TemplateRef<any>;
  @ViewChild("retrospective", {'static': true}) dialogRef2: TemplateRef<any>;
  @Input() retroDisabled = false;
  @Input() meetingDisabled: boolean;
  @Output() setMeetingDisabled  = new EventEmitter<boolean>();

  constructor(public timerSrv: TimerService, public dialog: MatDialog, private pointsSrv: PointsService) {

  }

  ngOnInit() {

  }

  openMeeting(): void {
    this.dialogRefa = this.dialog.open(this.dialogRef, {data: "some data"});

  }

  openRetrospective(): void {
    this.dialogRefa = this.dialog.open(this.dialogRef2, {data: "some data"});
  }


  meetingYes() {
   this.dialogRefa.close();
    this.timerSrv.timeLeft = this.timerSrv.timeLeft - this.timerSrv.currentTime - 10;
    this.timerSrv.myTimer.unsubscribe();
    this.timerSrv.observableTimer();
    this.timerSrv.currentTime = 0;
    this.setMeetingDisabled.emit(true)
    this.pointsSrv.userTeam += 1;
  }

  meetingNo() {
     this.dialogRefa.close()
  }

  retroYes() {
    this.dialogRefa.close();
    this.pointsSrv.userTeam += 2;
  }

  retroNo() {
     this.dialogRefa.close()
  }
}

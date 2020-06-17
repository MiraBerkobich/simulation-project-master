import {Component, OnInit, ViewChild} from '@angular/core';
import {DiaryService} from "../../services/diary.service";
import {AuthService} from "../../services/auth.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {
  user: any;
  records: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'right_answer', 'comment'];
  dataSource: any;

   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public diarySrv: DiaryService, public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.diarySrv.getDiary(this.user.user_id).subscribe(
      data=>{
        this.records = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.records);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {PointsService} from "../../services/points.service";

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  constructor(public hist: Location, public pointsSrv: PointsService) { }

  ngOnInit() {
  }

   backClicked() {
    this.hist.back();
  }

}

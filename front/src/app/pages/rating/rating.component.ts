import { Component, OnInit } from '@angular/core';
import {RatingService} from "../../services/rating.service";
import {ProjectsService} from "../../services/projects.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  ratings: any;

  constructor(public ratingSrv: RatingService, public projectsSrv: ProjectsService) { }

  ngOnInit() {
    this.getRatings();
  }

  getRatings(){
      let project_id = this.projectsSrv.mainProject.id;
      this.ratingSrv.getRatings(project_id).subscribe(data => {
        this.ratings = data;
      })
  }

}

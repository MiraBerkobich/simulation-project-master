import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ProjectsService} from "../services/projects.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(private projectsSrv: ProjectsService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.projectsSrv.mainProject) {
      this.router.navigate(['projects']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {SprintService} from "../services/sprint.service";

@Injectable({
  providedIn: 'root'
})
export class SprintGuard implements CanActivate {

  constructor(public sprint: SprintService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.sprint.sprint >= 2;
  }
}

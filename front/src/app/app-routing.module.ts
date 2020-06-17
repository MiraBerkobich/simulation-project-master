import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AuthGuard} from "./guards/auth.guard";
import {IndexComponent} from "./pages/index/index.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
import {AboutProjectComponent} from "./pages/about-project/about-project.component";
import {ProjectGuard} from "./guards/main-project.guard";
import {TasksComponent} from "./pages/tasks/tasks.component";
import {QuestionsComponent} from "./pages/questions/questions.component";
import {DiaryComponent} from "./pages/diary/diary.component";
import {ClientComponent} from "./pages/client/client.component";
import {TeamComponent} from "./pages/team/team.component";
import {PointsComponent} from "./pages/points/points.component";
import {TasksListComponent} from "./pages/tasks-list/tasks-list.component";
import {SprintGuard} from "./guards/sprint.guard";
import {RatingComponent} from "./pages/rating/rating.component";
import {TeamGuard} from "./guards/team.guard";
import {ClientGuard} from "./guards/client.guard";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'index', canActivate: [AuthGuard], component: IndexComponent },
  { path: 'projects', canActivate: [AuthGuard], component: ProjectsComponent },
  { path: 'about-project', canActivate: [AuthGuard, ProjectGuard], component: AboutProjectComponent },
  { path: 'tasks', canActivate: [AuthGuard, ProjectGuard], component: TasksComponent },
  { path: 'tasks-list', canActivate: [AuthGuard, ProjectGuard], component: TasksListComponent },
  { path: 'questions', canActivate: [AuthGuard, ProjectGuard], component: QuestionsComponent },
  { path: 'diary', canActivate: [AuthGuard], component: DiaryComponent },
  { path: 'client', canActivate: [AuthGuard, SprintGuard, ProjectGuard, ClientGuard], component: ClientComponent },
  { path: 'team', canActivate: [AuthGuard, SprintGuard, ProjectGuard, TeamGuard], component: TeamComponent },
  { path: 'points', canActivate: [AuthGuard], component: PointsComponent },
  { path: 'rating', canActivate: [AuthGuard, ProjectGuard], component: RatingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

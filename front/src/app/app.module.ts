import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import { IndexComponent } from './pages/index/index.component';
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import { MenuComponent } from './shared/menu/menu.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AboutProjectComponent } from './pages/about-project/about-project.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CdkTableModule} from '@angular/cdk/table';
import { QuestionsComponent } from './pages/questions/questions.component';
import { DiaryComponent } from './pages/diary/diary.component';
import { ClientComponent } from './pages/client/client.component';
import { TeamComponent } from './pages/team/team.component';
import { PointsComponent } from './pages/points/points.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { CurrentComponent } from './pages/questions/shared/current/current.component';
import { NextComponent } from './pages/questions/shared/next/next.component';
import { CompleteComponent } from './pages/questions/shared/complete/complete.component';
import { RatingComponent } from './pages/rating/rating.component';

export function tokenGetter() {
  return localStorage.getItem("u_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    IndexComponent,
    MenuComponent,
    ProjectsComponent,
    AboutProjectComponent,
    TasksComponent,
    QuestionsComponent,
    DiaryComponent,
    ClientComponent,
    TeamComponent,
    PointsComponent,
    ToolbarComponent,
    TasksListComponent,
    CurrentComponent,
    NextComponent,
    CompleteComponent,
    RatingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            }
        }),

        FormsModule, ReactiveFormsModule,

        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule, MatCardModule, MatCheckboxModule,
        CdkTableModule
    ],
  providers: [MatDatepickerModule,],
  bootstrap: [AppComponent]
})
export class AppModule {
}

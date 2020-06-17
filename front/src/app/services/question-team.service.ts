import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TasksService} from "./tasks.service";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {DiaryService} from "./diary.service";
import {environment} from "../../environments/environment";

const api: string = environment.server;

@Injectable({
  providedIn: 'root'
})
export class QuestionTeamService {
  questions: any;
  currentQuestion: any;
  answered = false;
  user: any;
  userAnswer: any;
  showQuestion = true;
  screenLocked = true;
  teamQuestions: any;
  teamCurrentQuestion: any;
  teamAnswered: boolean;
  showClientQuestion = true;
  question_length: false;

  constructor(private http: HttpClient, private tasksSrv: TasksService,
              public router: Router, public auth: AuthService, public diarySrv: DiaryService) {
    this.user = this.auth.getUser();
    this.getTeamQuestions();
  }


  getTeamQuestions() {
    let params = new HttpParams();
    params = params.append('team', '1');
    this.http.get(`${api}/questions/`, {params: params}).subscribe(data => {
      this.teamQuestions = data;
      this.getTeamCurrentQuestion();
    });
  }

  getTeamCurrentQuestion() {
    if (!this.teamQuestions.length)  this.question_length = false;
    this.teamCurrentQuestion = this.teamQuestions.shift();
    this.teamAnswered = false;
  }

  createTeamDiaryRecord() {
    // 'user_id': this.user['user_id']

    let record = {
      //'user': this.user['user_id'],
      //'task': null,
      'question': this.teamCurrentQuestion.desc,
      'answer': this.userAnswer.text,
      'right_answer': this.teamCurrentQuestion.answers.find(el => {
        if (el.correct) return el
      }).text
    };
    this.diarySrv.createDiaryRecord(record, this.user['user_id']).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    });
  }

  setAnswer(ans: any) {
    this.answered = true;
  }
}

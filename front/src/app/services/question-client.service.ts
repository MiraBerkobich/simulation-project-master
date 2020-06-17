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
export class QuestionClientService {
  questions: any;
  currentQuestion: any;
  answered = false;
  user: any;
  userAnswer: any;
  showQuestion = true;
  screenLocked = true;
  clientQuestions: any;
  clientCurrentQuestion: any;
  clientAnswered: boolean;
  showClientQuestion = true;
  question_length = true;

  constructor(private http: HttpClient, private tasksSrv: TasksService,
              public router: Router, public auth: AuthService, public diarySrv: DiaryService) {
    this.user = this.auth.getUser();
    this.getClientQuestions();
  }

  getClientQuestions() {
    let params = new HttpParams();
    params = params.append('client', '1');
    this.http.get(`${api}/questions/`, {params: params}).subscribe(data => {
      this.clientQuestions = data;
      this.getClientCurrentQuestion();
    });
  }

  getClientCurrentQuestion() {
    if (!this.clientQuestions.length) this.question_length = false;
    this.clientCurrentQuestion = this.clientQuestions.shift();
    this.clientAnswered = false;
  }

  createClientDiaryRecord() {
    let record = {
      'task': null,
      'question': this.clientCurrentQuestion.desc,
      'answer': this.userAnswer.text,
      'right_answer': this.clientCurrentQuestion.answers.find(el => {
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

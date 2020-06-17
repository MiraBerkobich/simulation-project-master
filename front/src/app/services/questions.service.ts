import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TasksService} from "./tasks.service";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {DiaryService} from "./diary.service";
import {CompleteTasksCounterService} from "./complete-tasks-counter.service";
import {SprintService} from "./sprint.service";
import {PointsService} from "./points.service";
import {ProjectsService} from "./projects.service";
import {RatingService} from "./rating.service";

const api: string = environment.server;

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    questions: any;
    currentQuestion: any;
    answered = false;
    user: any;
    userAnswer: any;
    showQuestion = true;
    screenLocked = true;
    showNewSprintScreen = false;
    complexityUp = true;

    //complete_questions_ids: number[] = [];

    constructor(private http: HttpClient, private tasksSrv: TasksService,
                public router: Router, public auth: AuthService, public diarySrv: DiaryService,
                public completeTasksSrv: CompleteTasksCounterService, private sprintSrv: SprintService,
                public pointsSrv: PointsService, private projectSrv: ProjectsService, private ratingSrv: RatingService) {
        this.getQuestions();
        this.user = this.auth.getUser();
    }

    getQuestions() {
        let params = new HttpParams();
        params = params.append('tasks', this.tasksSrv.user_tasks.join(', '));
        this.http.get(`${api}/questions/`, {params: params}).subscribe(data => {
            console.log(Object.keys(data));
            this.questions = data;
            //this.questions = this.questions.filter(q => q.complexity === this.getComplexity());
            this.getCurrentQuestion();
        });
    }

    setAnswer(ans: any) {
        this.answered = true;
    }

    checkPoints(): boolean {
        let checked = true;
        if (this.pointsSrv.getBudgetPoints() < 25) return false;
        if (this.pointsSrv.getDeadline() < 1) return false;
        if (this.pointsSrv.getClientPoints() < 1) return false;
        if (this.pointsSrv.getTeamPoints() < 1) return false;
        if (this.pointsSrv.getQualityPoints() < 1) return false;
        return checked;
    }

    setUserAnswer() {
        //if(this.userAnswer.customer < 0)
        //console.log(this.userAnswer);
        this.pointsSrv.userDeadline += this.userAnswer.deadlines;
        this.pointsSrv.userBudget += this.userAnswer.budget;
        this.pointsSrv.userClient += this.userAnswer.customer;
        this.pointsSrv.userTeam += this.userAnswer.team;
        this.pointsSrv.userQuality += this.userAnswer.quality;
        //console.log(this.userAnswer);
        // Если это не первый спринт и баллы за клиента меньше 0, то разблокируем
        // вкладку Заказчик
        if (this.sprintSrv.sprint > 1 && this.userAnswer.customer < 0) {
            this.sprintSrv.clientLock = false;
        }
        // Если это не первый спринт и баллы за команду меньше 0, то разблокируем
        // вкладку Команда
        if (this.sprintSrv.sprint > 1 && this.userAnswer.team < 0) {
            this.sprintSrv.teamLock = false;
        }
        if(this.completeTasksSrv.complete_questions_ids.indexOf(this.currentQuestion.id) === -1){
             this.completeTasksSrv.complete_questions_ids.push(this.currentQuestion.id);
        }

        this.deleteCurrentQuestion();

        // Если пользователь ответил правильно, то повышаем сложность
        // Если неправильно, то понижаем
        this.complexityUp = !!this.userAnswer.correct;

    }

    getUserRating() {
        return this.pointsSrv.getBudgetPoints() + this.pointsSrv.getDeadline() + this.pointsSrv.getClientPoints() +
            this.pointsSrv.getTeamPoints() + this.pointsSrv.getQualityPoints()
    }

    setRating() {
        this.projectSrv.userCounterQuestionsForProject += 1;
        if (this.projectSrv.userCounterQuestionsForProject === this.projectSrv.mainProject.tasks_count) {
            this.ratingSrv.createRating(this.getUserRating(), this.projectSrv.mainProject.id).subscribe(() => {
                this.projectSrv.userCounterQuestionsForProject = 0;
            })
        }
    }

    compareComplexity(a, b) {
        if (a.complexity < b.complexity) {
            return -1;
        }
        if (a.complexity > b.complexity) {
            return 1;
        }
        return 0;
    }

    getCurrentQuestion() {
        if (!this.questions.length) this.showNewSprintScreen = true;
        console.log(this.questions);
        this.questions.sort(this.compareComplexity);
        console.log(this.questions);
        //this.currentQuestion = this.questions.shift();
        if(this.complexityUp){
          this.currentQuestion = this.questions[this.questions.length - 1];
        } else {
          this.currentQuestion = this.questions.reverse()[this.questions.length - 1];
        }
        this.answered = false;
    }

    deleteCurrentQuestion(){
        this.questions.splice( this.questions.indexOf(this.currentQuestion), 1 );
    }

    createDiaryRecord() {
        // 'user_id': this.user['user_id']



        let record = {
            //'user': this.user['user_id'],
            'task': this.currentQuestion.task.name,
            'question': this.currentQuestion.desc,
            'answer': this.userAnswer.text,
            'right_answer': this.currentQuestion.answers.find(el => {
                if (el.correct) return el
            }).text
        };
        this.diarySrv.createDiaryRecord(record, this.user['user_id']).subscribe(data => {

        }, error => {
            console.log(error)
        });
    }

    getComplexity() {
        let complexity = 2;

        return complexity;
    }

    resetQuestionScreen() {
        this.showQuestion = false;
    }

    unlockScreen() {
        this.screenLocked = false;
    }

    lockScreen() {
        this.screenLocked = true;
    }
}

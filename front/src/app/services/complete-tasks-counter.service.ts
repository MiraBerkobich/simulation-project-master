import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompleteTasksCounterService {

  complete_questions_ids: number[] = [];

  constructor() { }
}

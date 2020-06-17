import { TestBed } from '@angular/core/testing';

import { CompleteTasksCounterService } from './complete-tasks-counter.service';

describe('CompleteTasksCounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompleteTasksCounterService = TestBed.get(CompleteTasksCounterService);
    expect(service).toBeTruthy();
  });
});

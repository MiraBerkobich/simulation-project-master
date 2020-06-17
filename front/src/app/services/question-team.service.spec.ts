import { TestBed } from '@angular/core/testing';

import { QuestionTeamService } from './question-team.service';

describe('QuestionTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionTeamService = TestBed.get(QuestionTeamService);
    expect(service).toBeTruthy();
  });
});

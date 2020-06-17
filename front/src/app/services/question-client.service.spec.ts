import { TestBed } from '@angular/core/testing';

import { QuestionClientService } from './question-client.service';

describe('QuestionClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionClientService = TestBed.get(QuestionClientService);
    expect(service).toBeTruthy();
  });
});

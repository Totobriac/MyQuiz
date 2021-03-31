import { TestBed } from '@angular/core/testing';

import { TrailerQuestionService } from './trailer-question.service';

describe('TrailerQuestionService', () => {
  let service: TrailerQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrailerQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

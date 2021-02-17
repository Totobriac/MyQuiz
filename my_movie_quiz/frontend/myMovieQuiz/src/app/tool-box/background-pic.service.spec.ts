import { TestBed } from '@angular/core/testing';

import { BackgroundPicService } from './background-pic.service';

describe('BackgroundPicService', () => {
  let service: BackgroundPicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackgroundPicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

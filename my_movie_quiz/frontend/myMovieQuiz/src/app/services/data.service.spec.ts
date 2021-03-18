import { TestBed } from '@angular/core/testing';

import { MovieDataService } from './movie-data.service';

describe('DataService', () => {
  let service: MovieDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

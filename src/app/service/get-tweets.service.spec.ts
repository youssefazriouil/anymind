import { TestBed } from '@angular/core/testing';

import { GetTweetsService } from './get-tweets.service';

describe('GetTweetsService', () => {
  let service: GetTweetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTweetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

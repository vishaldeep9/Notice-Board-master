import { TestBed } from '@angular/core/testing';

import { PostUtilityService } from './post-utility.service';

describe('PostUtilityService', () => {
  let service: PostUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

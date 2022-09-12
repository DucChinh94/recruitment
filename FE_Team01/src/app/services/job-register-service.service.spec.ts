import { TestBed } from '@angular/core/testing';

import { JobRegisterServiceService } from './job-register-service.service';

describe('JobRegisterServiceService', () => {
  let service: JobRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRegisterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

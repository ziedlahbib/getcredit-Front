import { TestBed } from '@angular/core/testing';

import { CreditrefuseService } from './creditrefuse.service';

describe('CreditrefuseService', () => {
  let service: CreditrefuseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditrefuseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StatitsiqteserviceService } from './statitsiqteservice.service';

describe('StatitsiqteserviceService', () => {
  let service: StatitsiqteserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatitsiqteserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

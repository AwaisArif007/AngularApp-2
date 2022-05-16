import { TestBed } from '@angular/core/testing';

import { DDLService } from './ddl.service';

describe('DDLService', () => {
  let service: DDLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DDLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

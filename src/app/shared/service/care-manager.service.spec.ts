import { TestBed } from '@angular/core/testing';

import { CareManagerService } from './care-manager.service';

describe('CareManagerService', () => {
  let service: CareManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

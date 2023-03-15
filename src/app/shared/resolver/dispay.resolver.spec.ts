import { TestBed } from '@angular/core/testing';

import { DispayResolver } from './dispay.resolver';

describe('DispayResolver', () => {
  let resolver: DispayResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DispayResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

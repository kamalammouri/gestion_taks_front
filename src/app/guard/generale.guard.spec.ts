import { TestBed } from '@angular/core/testing';

import { GeneraleGuard } from './generale.guard';

describe('GeneraleGuard', () => {
  let guard: GeneraleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeneraleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

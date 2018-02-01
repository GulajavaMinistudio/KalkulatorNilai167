import { TestBed, async, inject } from '@angular/core/testing';

import { ChromeBrowserGuardGuard } from './chrome-browser-guard.guard';

describe('ChromeBrowserGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromeBrowserGuardGuard]
    });
  });

  it('should ...', inject([ChromeBrowserGuardGuard], (guard: ChromeBrowserGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});

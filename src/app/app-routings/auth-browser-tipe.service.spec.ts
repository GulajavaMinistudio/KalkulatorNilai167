import { TestBed, inject } from '@angular/core/testing';

import { AuthBrowserTipeService } from './auth-browser-tipe.service';

describe('AuthBrowserTipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthBrowserTipeService]
    });
  });

  it('should be created', inject([AuthBrowserTipeService], (service: AuthBrowserTipeService) => {
    expect(service).toBeTruthy();
  }));
});

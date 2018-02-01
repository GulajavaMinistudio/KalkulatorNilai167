import { TestBed, inject } from '@angular/core/testing';

import { StoresDataService } from './stores-data.service';

describe('StoresDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoresDataService]
    });
  });

  it('should be created', inject([StoresDataService], (service: StoresDataService) => {
    expect(service).toBeTruthy();
  }));
});

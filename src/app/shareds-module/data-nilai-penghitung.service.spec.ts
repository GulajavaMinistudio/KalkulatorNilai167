import { TestBed, inject } from '@angular/core/testing';

import { DataNilaiPenghitungService } from './data-nilai-penghitung.service';

describe('DataNilaiPenghitungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataNilaiPenghitungService]
    });
  });

  it('should be created', inject([DataNilaiPenghitungService], (service: DataNilaiPenghitungService) => {
    expect(service).toBeTruthy();
  }));
});

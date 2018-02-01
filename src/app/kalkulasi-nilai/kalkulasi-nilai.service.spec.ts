import { TestBed, inject } from '@angular/core/testing';

import { KalkulasiNilaiService } from './kalkulasi-nilai.service';

describe('KalkulasiNilaiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KalkulasiNilaiService]
    });
  });

  it('should be created', inject([KalkulasiNilaiService], (service: KalkulasiNilaiService) => {
    expect(service).toBeTruthy();
  }));
});

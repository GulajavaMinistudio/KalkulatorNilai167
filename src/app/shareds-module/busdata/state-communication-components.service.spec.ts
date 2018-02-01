import { TestBed, inject } from '@angular/core/testing';

import { StateCommunicationComponentsService } from './state-communication-components.service';

describe('StateCommunicationComponentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateCommunicationComponentsService]
    });
  });

  it('should be created', inject([StateCommunicationComponentsService], (service: StateCommunicationComponentsService) => {
    expect(service).toBeTruthy();
  }));
});

import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/observable/interval';

@Injectable()
export class CheckForUpdateService {

  constructor(private updates: SwUpdate) {
    this.getUpdateWebPWA();
  }

  getUpdateWebPWA() {

    interval(6 * 60 * 60).subscribe(
      () => {
        this.updates.checkForUpdate();
      }
    );
  }
}

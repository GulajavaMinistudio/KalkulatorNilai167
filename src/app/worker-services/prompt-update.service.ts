import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PromptUpdateService {

  constructor(private updates: SwUpdate) {
    this.getUpdatesWebPWA();
  }

  getUpdatesWebPWA() {
    this.updates.available.subscribe(
      event => {
        this.updates.activateUpdate().then(() => document.location.reload());
      }
    );
  }
}

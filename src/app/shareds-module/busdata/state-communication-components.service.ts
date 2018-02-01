import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateCommunicationComponentsService {

  // observable any sources untuk komunikasi parent component ke component kalkulator
  dataNilaiBusSendHomeComponent = new Subject<any>();
  // observable string streams
  dataNilaiBusSendHomeComponent$ = this.dataNilaiBusSendHomeComponent.asObservable();

  // observable any untuk komunikasi dari settings component ke parent component
  notifRefreshData = new Subject<any>();
  notifRefreshData$ = this.notifRefreshData.asObservable();

  constructor() { }

  sendBusDataNilaiToKomponen(value: any) {
    this.dataNilaiBusSendHomeComponent.next(value);
  }

  sendBusRefreshDataFromSettings() {
    this.notifRefreshData.next(true);
  }
}

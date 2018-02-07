import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateCommunicationComponentsService {

  // observable any sources untuk komunikasi parent component ke component kalkulator
  dataNilaiBusHomeComponent = new Subject<any>();
  // observable string streams
  dataNilaiBusHomeComponent$ = this.dataNilaiBusHomeComponent.asObservable();

  // subject observable untuk meminta data ke komponen utama dari kalkulator, dari halaman setelan
  dataSetelanRequest = new Subject<any>();
  dataSetelanRequest$ = this.dataSetelanRequest.asObservable();

  constructor() {
  }

  sendBusDataNilaiToKomponen(value: any) {
    this.dataNilaiBusHomeComponent.next(value);
  }

  sendBusDataSetelan(kodeBus: number) {
    this.dataSetelanRequest.next(kodeBus);
  }
}

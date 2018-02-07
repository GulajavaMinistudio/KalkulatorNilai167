import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StateCommunicationComponentsService } from '../../shareds-module/busdata/state-communication-components.service';
import { singletonInstanceDataNilai as instanceNilai } from '../../shareds-module/local-storages/singleton-data-nilai';
import { DataNilaiPenghitungService } from '../../shareds-module/data-nilai-penghitung.service';
import { Router } from '@angular/router';
import { REFRESH_DATA_FROMSETTINGS, REQUEST_KIRIMDATA_SETELAN, REQUEST_MINTADATA_SETELAN } from '../../shareds-module/busdata/konstan-bus';
import { UtilanPelengkap } from '../../shareds-module/utils-pelengkap';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-setelan-kalkulator',
  templateUrl: './setelan-kalkulator.component.html',
  styleUrls: ['./setelan-kalkulator.component.css']
})
export class SetelanKalkulatorComponent implements OnInit, OnDestroy {

  isNilaiTugasValid = true;
  isNilaiUTSValid = true;
  isNilaiUASValid = true;

  stringPengaliNilaiTugas = '0';
  stringPengaliNilaiUTS = '0';
  stringPengaliNilaiUAS = '0';

  stringBatasBawahNilaiA = '0';
  stringBatasBawahNilaiB = '0';
  stringBatasBawahNilaiC = '0';
  stringBatasBawahNilaiD = '0';

  pesanInputDataNotValid = '';
  isInputDataOk = true;

  utilPelengkap: UtilanPelengkap;
  compositeSubscriber: Subscription;

  constructor(private busService: StateCommunicationComponentsService,
              private dataService: DataNilaiPenghitungService,
              private routers: Router) {

    this.utilPelengkap = new UtilanPelengkap();
    this.compositeSubscriber = new Subscription();
  }

  ngOnInit() {

    if (this.compositeSubscriber.closed) {
      this.compositeSubscriber = new Subscription();
    }

    this.initSubscriberBus();
  }

  ngOnDestroy(): void {
    this.compositeSubscriber.unsubscribe();
  }

  initSubscriberBus() {

    this.compositeSubscriber.add(
      this.busService.dataSetelanRequest$.subscribe(
        (kodebus: number) => {

          if (kodebus === REQUEST_KIRIMDATA_SETELAN) {
            this.getDataSetelanNilai();
          }
        },
        (errors) => {
          console.log(errors);
        }
      )
    );

    this.sendPesanBusRefreshData(REQUEST_MINTADATA_SETELAN);
  }

  getDataSetelanNilai() {

    this.stringPengaliNilaiTugas = instanceNilai.stringPengaliNilaiTugas;
    this.stringPengaliNilaiUTS = instanceNilai.stringPengaliNilaiUTS;
    this.stringPengaliNilaiUAS = instanceNilai.stringPengaliNilaiUAS;

    this.stringBatasBawahNilaiA = instanceNilai.stringBatasNilaiA;
    this.stringBatasBawahNilaiB = instanceNilai.stringBatasNilaiB;
    this.stringBatasBawahNilaiC = instanceNilai.stringBatasNilaiC;
    this.stringBatasBawahNilaiD = instanceNilai.stringBatasNilaiD;
  }

  checkIsianNilaiBatasBawah() {

    this.isInputDataOk = true;
    this.isNilaiTugasValid = true;
    this.isNilaiUTSValid = true;
    this.isNilaiUASValid = true;
    this.isInputDataOk = true;

    let isDataBatasBawahBenar = false;
    let isDataPengaliBenar = false;

    if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringPengaliNilaiTugas)) {
      isDataPengaliBenar = false;
      this.isNilaiTugasValid = false;
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringPengaliNilaiUTS)) {
      isDataPengaliBenar = false;
      this.isNilaiUTSValid = false;
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringPengaliNilaiUAS)) {
      isDataPengaliBenar = false;
      this.isNilaiUASValid = false;
    } else {
      isDataPengaliBenar = true;
    }

    if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiA)) {
      isDataBatasBawahBenar = false;
      this.isInputDataOk = false;
      this.pesanInputDataNotValid = 'Isi batas nilai A dengan benar';
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiB)) {
      isDataBatasBawahBenar = false;
      this.isInputDataOk = false;
      this.pesanInputDataNotValid = 'Isi batas nilai B dengan benar';
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiC)) {
      isDataBatasBawahBenar = false;
      this.isInputDataOk = false;
      this.pesanInputDataNotValid = 'Isi batas nilai C dengan benar';
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiD)) {
      isDataBatasBawahBenar = false;
      this.isInputDataOk = false;
      this.pesanInputDataNotValid = 'Isi batas nilai D dengan benar';
    } else {
      isDataBatasBawahBenar = true;
      this.isInputDataOk = true;
    }

    if (isDataPengaliBenar && isDataBatasBawahBenar) {

      const numberPengaliNilaiTugas: number = parseFloat(this.stringPengaliNilaiTugas);
      const numberPengaliNilaiUTS: number = parseFloat(this.stringPengaliNilaiUTS);
      const numberPengaliNilaiUAS: number = parseFloat(this.stringPengaliNilaiUAS);

      // total nilai pengali harus 100 persen
      const totalPengaliNilai = numberPengaliNilaiTugas + numberPengaliNilaiUTS + numberPengaliNilaiUAS;
      if (totalPengaliNilai === 100) {
        if (isDataBatasBawahBenar) {

          instanceNilai.stringPengaliNilaiTugas = this.stringPengaliNilaiTugas;
          instanceNilai.stringPengaliNilaiUTS = this.stringPengaliNilaiUTS;
          instanceNilai.stringPengaliNilaiUAS = this.stringPengaliNilaiUAS;

          instanceNilai.stringBatasNilaiA = this.stringBatasBawahNilaiA;
          instanceNilai.stringBatasNilaiB = this.stringBatasBawahNilaiB;
          instanceNilai.stringBatasNilaiC = this.stringBatasBawahNilaiC;
          instanceNilai.stringBatasNilaiD = this.stringBatasBawahNilaiD;

          this.saveDataSetelanLocalStorage();
        }
      } else {
        this.isInputDataOk = false;
        this.pesanInputDataNotValid = 'Total nilai pengali harus berjumlah 100 persen';
      }
    }
  }

  saveDataSetelanLocalStorage() {

    this.dataService.saveDataNilaiSetelanLocalStorage()
      .then(
        isSukses => {
          // pindah halaman ke halaman setelan
          if (isSukses) {
            this.sendPesanBusRefreshData(REFRESH_DATA_FROMSETTINGS);
            this.navigasiBalikKeHalamanKalkulator();
          }
        }
      )
      .catch(
        errors => {
          console.log(errors);
        }
      );
  }

  sendPesanBusRefreshData(kodepesan: number) {

    this.busService.sendBusDataSetelan(kodepesan);
  }

  clickCloseDialog() {

    $('.message .close')
      .closest('.message')
      .transition('fade');

    // reset status dialog ke true semua
    setTimeout(
      () => {
        this.isNilaiTugasValid = true;
        this.isNilaiUTSValid = true;
        this.isNilaiUASValid = true;
        this.isInputDataOk = true;
      }, 500
    );
  }

  navigasiBalikKeHalamanKalkulator() {
    this.routers.navigate(['/hitung-nilai/kalkulator-nilai']);
  }
}

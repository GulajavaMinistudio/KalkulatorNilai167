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
      this.showPesanErrorMasukan(false, 'Isi batas nilai A dengan benar');
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiB)) {
      isDataBatasBawahBenar = false;
      this.showPesanErrorMasukan(false, 'Isi batas nilai B dengan benar');
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiC)) {
      isDataBatasBawahBenar = false;
      this.showPesanErrorMasukan(false, 'Isi batas nilai C dengan benar');
    } else if (!this.utilPelengkap.isValidNumberFloatBenar(this.stringBatasBawahNilaiD)) {
      isDataBatasBawahBenar = false;
      this.showPesanErrorMasukan(false, 'Isi batas nilai D dengan benar');
    } else {
      isDataBatasBawahBenar = true;
    }

    if (isDataPengaliBenar && isDataBatasBawahBenar) {

      const numberPengaliNilaiTugas: number = parseFloat(this.stringPengaliNilaiTugas);
      const numberPengaliNilaiUTS: number = parseFloat(this.stringPengaliNilaiUTS);
      const numberPengaliNilaiUAS: number = parseFloat(this.stringPengaliNilaiUAS);

      // total nilai pengali harus 100 persen
      const totalPengaliNilai = numberPengaliNilaiTugas + numberPengaliNilaiUTS + numberPengaliNilaiUAS;
      if (totalPengaliNilai === 100) {
        if (isDataBatasBawahBenar) {

          // data batas bawah tidak boleh sama dan harus saling lebih besar jika peringkat nilai semakin tinggi
          const batasBawahNilaiA = parseFloat(this.stringBatasBawahNilaiA);
          const batasBawahNilaiB = parseFloat(this.stringBatasBawahNilaiB);
          const batasBawahNilaiC = parseFloat(this.stringBatasBawahNilaiC);
          const batasBawahNilaiD = parseFloat(this.stringBatasBawahNilaiD);

          const isBatasBawahOke = this.validasiBatasBawahOk(batasBawahNilaiA, batasBawahNilaiB, batasBawahNilaiC, batasBawahNilaiD);
          if (isBatasBawahOke) {
            instanceNilai.stringPengaliNilaiTugas = this.stringPengaliNilaiTugas;
            instanceNilai.stringPengaliNilaiUTS = this.stringPengaliNilaiUTS;
            instanceNilai.stringPengaliNilaiUAS = this.stringPengaliNilaiUAS;

            instanceNilai.stringBatasNilaiA = this.stringBatasBawahNilaiA;
            instanceNilai.stringBatasNilaiB = this.stringBatasBawahNilaiB;
            instanceNilai.stringBatasNilaiC = this.stringBatasBawahNilaiC;
            instanceNilai.stringBatasNilaiD = this.stringBatasBawahNilaiD;

            this.saveDataSetelanLocalStorage();
          }
        }
      } else {
        this.showPesanErrorMasukan(false, 'Total persentase dari nilai tugas, nilai UTS, dan nilai UAS harus 100 %');
      }
    }
  }

  /**
   * Cek apakah nilai batas bawah , sudah benar batasnya atau belum
   * @param {number} batasA batas nilai A
   * @param {number} batasB batas nilai B
   * @param {number} batasC batas nilai C
   * @param {number} batasD batas nilai D
   * @return {boolean} nilai balikan berupa boolean benar atau salah
   */
  validasiBatasBawahOk(batasA: number, batasB: number, batasC: number, batasD: number): boolean {

    let isBatasAValid = true;
    let isBatasBValid = true;
    let isBatasCValid = true;
    let isBatasDValid = true;
    this.isInputDataOk = true;

    // batas bawah nilai A harus lebih besar dari nilai yang lainnya
    if (batasA < batasB) {
      isBatasAValid = false;
    } else if (batasA < batasC) {
      isBatasAValid = false;
    } else if (batasA < batasD) {
      isBatasAValid = false;
    } else {
      isBatasAValid = true;
    }

    if (!isBatasAValid) {
      this.showPesanErrorMasukan(false, 'Batas bawah nilai A harus lebih tinggi dari batas bawah nilai B, C, dan D');
    }

    // batas bawah nilai B harus lebih kecil dari nilai A, tapi lebih besar dari batas nilai C dan D
    if (batasB > batasA) {
      isBatasBValid = false;
      this.showPesanErrorMasukan(false, 'Batas bawah nilai B harus lebih kecil dari batas bawah nilai A');
    } else if (batasB < batasC) {
      isBatasBValid = false;
      this.showPesanErrorMasukan(false, 'Batas bawah nilai B harus lebih besar dari batas bawah nilai C');
    } else if (batasB < batasD) {
      isBatasBValid = false;
      this.showPesanErrorMasukan(false, 'Batas bawah nilai B harus lebih besar dari batas bawah nilai D');
    } else {
      isBatasBValid = true;
    }

    // batas bawah nilai C harus lebih kecil dari batas nilai A dan B, tapi lebih besar dari batas nilai D
    if (batasC > batasA) {
      isBatasCValid = false;
      this.showPesanErrorMasukan(false, 'Batas bawah nilai C harus lebih kecil dari batas bawah nilai A');
    } else if (batasC > batasB) {
      isBatasCValid = false;
      this.showPesanErrorMasukan(false, 'Batas bawah nilai C harus lebih kecil dari batas bawah nilai B');
    } else if (batasC < batasD) {
      isBatasCValid = false;
      this.showPesanErrorMasukan(false, 'Batas bawah nilai C harus lebih besar dari batas bawah nilai D');
    } else {
      isBatasCValid = true;
    }

    // batas bawah nilai D harus lebih kecil dari semua batas nilai
    if (batasD > batasA) {
      isBatasDValid = false;
    } else if (batasD > batasB) {
      isBatasDValid = false;
    } else if (batasD > batasC) {
      isBatasDValid = false;
    } else {
      isBatasDValid = true;
    }

    if (!isBatasDValid) {
      this.showPesanErrorMasukan(false, 'Batas bawah nilai D harus lebih kecil dari batas bawah nilai A, B, dan C');
    }

    console.log('inputan ok ' + this.isInputDataOk);
    return isBatasAValid && isBatasBValid && isBatasCValid && isBatasDValid;
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

  /**
   * Tampilkan pesan error masukan
   * @param {boolean} isDataOk apakah data sudah benar atau belum
   * @param {string} stringPesan
   */
  showPesanErrorMasukan(isDataOk: boolean, stringPesan: string) {

    this.isInputDataOk = isDataOk;
    this.pesanInputDataNotValid = stringPesan;
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

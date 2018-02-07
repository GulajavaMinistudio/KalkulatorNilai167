import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataNilaiPenghitungService } from './shareds-module/data-nilai-penghitung.service';
import { StateCommunicationComponentsService } from './shareds-module/busdata/state-communication-components.service';
import { REFRESH_DATA_FROMSETTINGS, REQUEST_KIRIMDATA_SETELAN, REQUEST_MINTADATA_SETELAN } from './shareds-module/busdata/konstan-bus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;

  constructor(private dataServices: DataNilaiPenghitungService,
              private busServiceToComp: StateCommunicationComponentsService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {

    if (this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }

    this.initSubscriberSettingMintaData();

    // cek data awal tersedia
    this.checkDataAwalTersedia();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
  }

  initSubscriberSettingMintaData() {

    this.subscriptions.add(
      this.busServiceToComp.dataSetelanRequest$.subscribe(
        (kodebus: number) => {

          if (kodebus === REQUEST_MINTADATA_SETELAN) {
            this.getDataNilaiToSettings();
          } else if (kodebus === REFRESH_DATA_FROMSETTINGS) {
            this.checkDataAwalTersedia();
          }
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }


  // cek apakah local storage tersimpan
  checkDataAwalTersedia() {

    // cek status data awal pengali tersedia
    this.dataServices.checkNilaiPengaliTersedia()
      .then(
        (isDataTersedia: boolean) => {
          if (isDataTersedia) {
            this.getDataAwalPengaliLocalStorage();
          } else {
            this.initDataAwalPengaliLocalStorage();
          }
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );

    // cek status data awal predikat nilai batas bawah
    this.checkInitDataBatasBawahNilai()
      .then(
        () => {
          // sukses inisialisasi data batas bawah nilai
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
  }

  /***
   * Ambil dan inisialisasi data pengali nilai untuk dikirim ke komponen kalkulator
   **/
  initDataAwalPengaliLocalStorage() {

    this.dataServices.initDataNilaiPengaliKalkulasi()
      .then(
        (isbooleanSukses) => {

          if (isbooleanSukses) {
            this.getDataAwalPengaliLocalStorage();
          }
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  /***
   * Ambil data pengali local storage
   */
  getDataAwalPengaliLocalStorage() {

    this.dataServices.getDataPengaliLocalStorageSemua()
      .then(
        (isSukses) => {

          if (isSukses) {
            this.sendBusKeKomponenKalkulator();
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }


  /***
   * Ambil data nilai awal pengali dan nilai batas bawah terlebih dahulu
   */
  async checkInitDataBatasBawahNilai() {

    try {
      const isBatasBawahAda: boolean = await this.dataServices.checkDataBatasBawahNilaiTersedia();

      if (isBatasBawahAda) {
        await this.dataServices.getDataBatasBawahSemua();
      } else {
        const isSukses: boolean = await this.dataServices.initDataBatasBawahKategoriNilai();
        if (isSukses) {
          await this.dataServices.getDataBatasBawahSemua();
        }
      }
    } catch (e) {
      throw e;
    }
  }

  // Sub komponen setelan meminta data terkini dari komponen halaman utama
  getDataNilaiToSettings() {

    this.getDataNilaiToSettingsAwait()
      .then(
        isOke => {
          if (isOke) {
            this.sendBusKomponenSetelan();
          }
        }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
  }

  // alternatif menggunakan async await
  async getDataNilaiToSettingsAwait() {

    try {
      const isSuksesCekPengali = await this.dataServices.checkNilaiPengaliTersedia();
      const isSuksesCekBatasBawah = await this.dataServices.checkDataBatasBawahNilaiTersedia();
      const isOkGetDataPengali = await this.dataServices.getDataPengaliLocalStorageSemua();
      const isOkGetDataBatasBawah = await this.dataServices.getDataBatasBawahSemua();

      return (isSuksesCekPengali && isSuksesCekBatasBawah && isOkGetDataPengali && isOkGetDataBatasBawah);
    } catch (e) {
      throw e;
    }
  }

  // kirim ke komponen kalkulator penghitung
  sendBusKeKomponenKalkulator() {
    setTimeout(
      () => {
        this.busServiceToComp.sendBusDataNilaiToKomponen(true);
      }, 600
    );
  }

  // kirim ke komponen setelan kalkulator
  sendBusKomponenSetelan() {
    setTimeout(
      () => {
        this.busServiceToComp.sendBusDataSetelan(REQUEST_KIRIMDATA_SETELAN);
      }, 600
    );
  }
}

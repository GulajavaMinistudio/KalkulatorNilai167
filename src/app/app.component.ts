import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataNilaiPenghitungService } from './shareds-module/data-nilai-penghitung.service';
import { StateCommunicationComponentsService } from './shareds-module/busdata/state-communication-components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  subscriptions: Subscription;

  constructor(private initAwalService: DataNilaiPenghitungService,
              private busServiceToComp: StateCommunicationComponentsService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {

    if (this.subscriptions.closed) {
      this.subscriptions = new Subscription();
    }

    this.initSubscriberFromSettings();

    // cek data awal tersedia
    this.checkDataAwalTersedia();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
  }

  initSubscriberFromSettings() {

    this.busServiceToComp.notifRefreshData$.subscribe(
      () => {
        this.getDataAwalLocalStorageFromSettings();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // cek apakah local storage tersimpan
  checkDataAwalTersedia() {

    // cek status data awal pengali tersedia
    this.initAwalService.checkNilaiPengaliTersedia()
      .then(
        (isDataTersedia) => {
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
    this.initAwalService.checkDataBatasBawahNilaiTersedia()
      .then(
        (isTersedia) => {

          if (isTersedia) {
            this.getDataAwalPengaliLocalStorage();
          } else {
            this.initDataAwalPengaliLocalStorage();
          }
        }
      )
      .catch(
        (errors) => {
          console.log(errors);
        }
      );
  }

  // inisialisasi local storage data pengali default
  initDataAwalPengaliLocalStorage() {

    this.initAwalService.initDataNilaiPengaliKalkulasi()
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

  // inisialisasi local storage batas bawah default
  initDataAwalBatasBawahNilai() {

    this.initAwalService.initDataBatasBawahKategoriNilai()
      .then(
        (isSukses) => {

        }
      )
      .catch(
        err => {
          console.log(err);
        }
      );
  }

  // ambil data pengali local storage
  getDataAwalPengaliLocalStorage() {

    this.initAwalService.getDataPengaliLocalStorageSemua()
      .then(
        (isSukses) => {

          if (isSukses) {
            this.sendBusKeKomponen();
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  // ambil data batas bawah nilai dan inisialisasi ke singleton
  getDataBatasBawahNilaiLocalStorage() {

    this.initAwalService.getDataBatasBawahSemua()
      .then(
        (isSukses) => {

        }
      )
      .catch(
        errors => {

        }
      );
  }

  // kirim ke komponen anak
  sendBusKeKomponen() {
    setTimeout(
      () => {
        this.busServiceToComp.sendBusDataNilaiToKomponen(true);
      }, 600
    );
  }


  /**
   * Ambil data awal kembali setelah setelan diperbarui di menu setelan
   */
  getDataAwalLocalStorageFromSettings() {

    this.initAwalService.getDataPengaliLocalStorageSemua()
      .then(
        (isSukses) => {

          if (isSukses) {
            this.sendBusKeKomponenHomeFromSettings();
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }


  /**
   * Kirim data awal kembali ke halaman bus komponen service
   */
  sendBusKeKomponenHomeFromSettings() {
    setTimeout(
      () => {
        this.busServiceToComp.sendBusRefreshDataFromSettings();
      }, 2000
    );
  }
}

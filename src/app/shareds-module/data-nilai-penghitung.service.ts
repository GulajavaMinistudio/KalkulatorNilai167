import { Injectable } from '@angular/core';
import { UtilanPelengkap } from './utils-pelengkap';
import { StoresDataService } from './stores-data.service';
import {
  DEFAULT_PENGALI_TUGAS,
  DEFAULT_PENGALI_UAS,
  DEFAULT_PENGALI_UTS,
  KEY_PENGALI_TUGAS,
  KEY_PENGALI_UAS,
  KEY_PENGALI_UTS
} from './local-storages/pengali-nilai';
import {
  DEFAULT_BATASBAWAH_NILAI_A,
  DEFAULT_BATASBAWAH_NILAI_B,
  DEFAULT_BATASBAWAH_NILAI_C,
  DEFAULT_BATASBAWAH_NILAI_D,
  KEY_BATASBAWAH_NILAI_A,
  KEY_BATASBAWAH_NILAI_B,
  KEY_BATASBAWAH_NILAI_C,
  KEY_BATASBAWAH_NILAI_D
} from './local-storages/batas-nilai';
import { singletonInstanceDataNilai as instanceNilai } from './local-storages/singleton-data-nilai';

@Injectable()
export class DataNilaiPenghitungService {

  utilPelengkap: UtilanPelengkap;

  constructor(private storesLocal: StoresDataService) {
    this.utilPelengkap = new UtilanPelengkap();
  }


  /**
   * cek apakah nilai nilai pengali sudah diinisialisasi atau belum
   * @return {any} balikan kelas DataNilai
   */
  checkNilaiPengaliTersedia(): any {

    return new Promise(
      (resolve) => {

        let isDataAwalTersedia = false;

        try {
          const mstringDefaultPengaliTugas = this.storesLocal.getDataWithKey(KEY_PENGALI_TUGAS);
          const mstringDefaultPengaliUTS = this.storesLocal.getDataWithKey(KEY_PENGALI_UTS);
          const mstringDefaultPengaliUAS = this.storesLocal.getDataWithKey(KEY_PENGALI_UAS);

          isDataAwalTersedia = this.utilPelengkap.isValidNumberFloatBenar(mstringDefaultPengaliTugas) &&
            this.utilPelengkap.isValidNumberFloatBenar(mstringDefaultPengaliUTS) &&
            this.utilPelengkap.isValidNumberFloatBenar(mstringDefaultPengaliUAS);
        } catch (e) {
          console.log(e);
          isDataAwalTersedia = false;
        }
        resolve(isDataAwalTersedia);
      },
    );
  }

  /**
   * inisialisasi data awal nilai pengali untuk penghitung
   * @return {any} Balikkan nilai promise
   */
  initDataNilaiPengaliKalkulasi(): any {

    return new Promise(
      (resolve) => {
        this.storesLocal.addDataLocalStorage(KEY_PENGALI_TUGAS, DEFAULT_PENGALI_TUGAS);
        this.storesLocal.addDataLocalStorage(KEY_PENGALI_UTS, DEFAULT_PENGALI_UTS);
        this.storesLocal.addDataLocalStorage(KEY_PENGALI_UAS, DEFAULT_PENGALI_UAS);

        resolve(true);
      }
    );
  }


  /**
   * ambil data kembali dari local storage untuk penghitungnya
   * @return {any} object data nilai yang berisi nilai pengali
   */
  getDataPengaliLocalStorageSemua(): any {

    return new Promise(
      (resolve) => {
        const mstringDefaultPengaliTugas = this.storesLocal.getDataWithKey(KEY_PENGALI_TUGAS);
        const mstringDefaultPengaliUTS = this.storesLocal.getDataWithKey(KEY_PENGALI_UTS);
        const mstringDefaultPengaliUAS = this.storesLocal.getDataWithKey(KEY_PENGALI_UAS);

        instanceNilai.stringPengaliNilaiTugas = mstringDefaultPengaliTugas;
        instanceNilai.stringPengaliNilaiUTS = mstringDefaultPengaliUTS;
        instanceNilai.stringPengaliNilaiUAS = mstringDefaultPengaliUAS;

        resolve(true);
      }
    );
  }

  // ========================== NILAI BATAS BAWAH KATEGORI NILAI ====================================

  /**
   * Cek apakah nilai batas bawah untuk kategori nilai sudah diinisialisasi
   * @return {any}
   */
  checkDataBatasBawahNilaiTersedia(): any {

    return new Promise(
      (resolve, reject) => {

        let isDataAwalTersedia = false;

        try {
          const batasBawahNilaiDefaultA = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_A);
          const batasBawahNilaiDefaultB = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_B);
          const batasBawahNilaiDefaultC = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_C);
          const batasBawahNilaiDefaultD = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_D);

          isDataAwalTersedia = this.utilPelengkap.isValidNumberFloatBenar(batasBawahNilaiDefaultA) &&
            this.utilPelengkap.isValidNumberFloatBenar(batasBawahNilaiDefaultB) &&
            this.utilPelengkap.isValidNumberFloatBenar(batasBawahNilaiDefaultC) &&
            this.utilPelengkap.isValidNumberFloatBenar(batasBawahNilaiDefaultD);
        } catch (e) {
          console.log(e);
          isDataAwalTersedia = false;
        }
        resolve(isDataAwalTersedia);
      }
    );
  }


  /**
   * Inisialisasi data batas bawah untuk pengelompokan kategori nilai
   * @return {any} nilai balikan adalah promise
   */
  initDataBatasBawahKategoriNilai(): any {

    return new Promise(
      (resolve) => {

        this.storesLocal.addDataLocalStorage(KEY_BATASBAWAH_NILAI_A, DEFAULT_BATASBAWAH_NILAI_A);
        this.storesLocal.addDataLocalStorage(KEY_BATASBAWAH_NILAI_B, DEFAULT_BATASBAWAH_NILAI_B);
        this.storesLocal.addDataLocalStorage(KEY_BATASBAWAH_NILAI_C, DEFAULT_BATASBAWAH_NILAI_C);
        this.storesLocal.addDataLocalStorage(KEY_BATASBAWAH_NILAI_D, DEFAULT_BATASBAWAH_NILAI_D);
        resolve(true);
      }
    );
  }

  getDataBatasBawahSemua(): any {

    return new Promise(
      (resolve, reject) => {

        const batasBawahDefaultA = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_A);
        const batasBawahDefaultB = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_B);
        const batasBawahDefaultC = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_C);
        const batasBawahDefaultD = this.storesLocal.getDataWithKey(KEY_BATASBAWAH_NILAI_D);

        instanceNilai.stringBatasNilaiA = batasBawahDefaultA;
        instanceNilai.stringBatasNilaiB = batasBawahDefaultB;
        instanceNilai.stringBatasNilaiC = batasBawahDefaultC;
        instanceNilai.stringBatasNilaiD = batasBawahDefaultD;

        resolve(true);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import {
  DEFAULT_PENGALI_TUGAS,
  DEFAULT_PENGALI_UAS,
  DEFAULT_PENGALI_UTS,
  KEY_PENGALI_TUGAS,
  KEY_PENGALI_UAS,
  KEY_PENGALI_UTS
} from '../shareds-module/local-storages/pengali-nilai';
import { UtilanPelengkap } from '../shareds-module/utils-pelengkap';
import { StoresDataService } from '../shareds-module/stores-data.service';
import { isNullOrUndefined } from 'util';
import * as Predikat from '../shareds-module/local-storages/predikat-nilai';
import { singletonInstanceDataNilai as instanceNilai } from '../shareds-module/local-storages/singleton-data-nilai';
import { DataNilaiKonversi } from '../shareds-module/local-storages/data-nilai';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PredikatNilaiHasil } from '../shareds-module/local-storages/predikat-nilai-hasil';

@Injectable()
export class KalkulasiNilaiService {

  stringDefaultPengaliTugas = DEFAULT_PENGALI_TUGAS;
  stringDefaultPengaliUTS = DEFAULT_PENGALI_UTS;
  stringDefaultPengaliUAS = DEFAULT_PENGALI_UAS;

  numberDefaultPengaliTugas = 0;
  numberDefaultPengaliUTS = 0;
  numberDefaultPengaliUAS = 0;

  utilPelengkap: UtilanPelengkap;

  constructor(private storeSetelan: StoresDataService) {
    this.utilPelengkap = new UtilanPelengkap();
  }


  /**
   * kalkulasi nilai pelajaran berdasarkan data nilai yang dimasukkan pengguna
   * @param {DataNilaiKonversi} dataNilaiKonversi
   * @return {Observable<DataNilaiKonversi>}
   */
  kalkulasiNilaiPelajaranAkhir(dataNilaiKonversi: DataNilaiKonversi): Observable<DataNilaiKonversi> {

    return Observable.create(
      observer => {

        // ambil dari local storage
        try {
          const mstringDefaultPengaliTugas = this.storeSetelan.getDataWithKey(KEY_PENGALI_TUGAS);
          const mstringDefaultPengaliUTS = this.storeSetelan.getDataWithKey(KEY_PENGALI_UTS);
          const mstringDefaultPengaliUAS = this.storeSetelan.getDataWithKey(KEY_PENGALI_UAS);

          if (!isNullOrUndefined(mstringDefaultPengaliTugas)
            && !isNullOrUndefined(mstringDefaultPengaliUTS)
            && !isNullOrUndefined(mstringDefaultPengaliUAS)) {

            if (!this.utilPelengkap.isEmptyStringsNulls(mstringDefaultPengaliTugas)
              && !this.utilPelengkap.isEmptyStringsNulls(mstringDefaultPengaliUTS) &&
              !this.utilPelengkap.isEmptyStringsNulls(mstringDefaultPengaliUAS)) {

              this.stringDefaultPengaliTugas = mstringDefaultPengaliTugas;
              this.stringDefaultPengaliUTS = mstringDefaultPengaliUTS;
              this.stringDefaultPengaliUAS = mstringDefaultPengaliUAS;

              dataNilaiKonversi.numberNilaiTugas = parseFloat(dataNilaiKonversi.stringNilaiTugas);
              dataNilaiKonversi.numberNilaiUTS = parseFloat(dataNilaiKonversi.stringNilaiUTS);
              dataNilaiKonversi.numberNilaiUAS = parseFloat(dataNilaiKonversi.stringNilaiUAS);
            }
          }
        } catch (e) {
          console.log(e);
        }

        this.numberDefaultPengaliTugas = parseFloat(this.stringDefaultPengaliTugas);
        this.numberDefaultPengaliUTS = parseFloat(this.stringDefaultPengaliUTS);
        this.numberDefaultPengaliUAS = parseFloat(this.stringDefaultPengaliUAS);

        observer.next(dataNilaiKonversi);
      }
    ).map(
      datanilaikonversi => {

        let nilaiAkhir = 0;
        const numberNilaiTugas = datanilaikonversi.numberNilaiTugas;
        const numberNilaiUTS = datanilaikonversi.numberNilaiUTS;
        const numberNilaiUAS = datanilaikonversi.numberNilaiUAS;

        // const nilaiAkhir = (nilaiTugas * 20 / 100) + (nilaiUTS * 35 / 100) + (nilaiUAS * 45 / 100);
        try {
          nilaiAkhir = (numberNilaiTugas * this.numberDefaultPengaliTugas / 100)
            + (numberNilaiUTS * this.numberDefaultPengaliUTS / 100)
            + (numberNilaiUAS * this.numberDefaultPengaliUAS / 100);
          datanilaikonversi.numberNilaiAkhir = nilaiAkhir;
        } catch (e) {
          console.log(e);
        }

        return datanilaikonversi;
      }
    ).catch(
      error => {
        console.log(error);
        console.log(error.message);
        return Observable.of(error);
      }
    );
  }

  /**
   * Ambil predikat nilai akhir dan keluarkan hasil dalam bentuk alphabet
   * @param {number} nilaiAkhir
   * @return {string}
   */
  getPredikatNilai(nilaiAkhir: number): any {

    let stringPredikatNilai = '-';
    let stringPredikatNamaNilai = '-';

    return new Promise<PredikatNilaiHasil>(
      (resolve) => {

        const predikatNilaiHasil = new PredikatNilaiHasil();

        const batasBawahDefaultA = instanceNilai.stringBatasNilaiA;
        const batasBawahDefaultB = instanceNilai.stringBatasNilaiB;
        const batasBawahDefaultC = instanceNilai.stringBatasNilaiC;
        const batasBawahDefaultD = instanceNilai.stringBatasNilaiD;

        const floatBatasBawahDefaultA = parseFloat(batasBawahDefaultA);
        const floatBatasBawahDefaultB = parseFloat(batasBawahDefaultB);
        const floatBatasBawahDefaultC = parseFloat(batasBawahDefaultC);
        const floatBatasBawahDefaultD = parseFloat(batasBawahDefaultD);

        if (nilaiAkhir > floatBatasBawahDefaultA) {
          stringPredikatNilai = Predikat.PREDIKAT_NILAI_A;
        } else if (nilaiAkhir > floatBatasBawahDefaultB) {
          stringPredikatNilai = Predikat.PREDIKAT_NILAI_B;
        } else if (nilaiAkhir > floatBatasBawahDefaultC) {
          stringPredikatNilai = Predikat.PREDIKAT_NILAI_C;
        } else if (nilaiAkhir > floatBatasBawahDefaultD) {
          stringPredikatNilai = Predikat.PREDIKAT_NILAI_D;
        } else {
          stringPredikatNilai = Predikat.PREDIKAT_NILAI_E;
        }

        if (nilaiAkhir > floatBatasBawahDefaultA) {
          stringPredikatNamaNilai = Predikat.PREDIKAT_NAMA_A;
        } else if (nilaiAkhir > floatBatasBawahDefaultB) {
          stringPredikatNamaNilai = Predikat.PREDIKAT_NAMA_B;
        } else if (nilaiAkhir > floatBatasBawahDefaultC) {
          stringPredikatNamaNilai = Predikat.PREDIKAT_NAMA_C;
        } else if (nilaiAkhir > floatBatasBawahDefaultD) {
          stringPredikatNamaNilai = Predikat.PREDIKAT_NAMA_D;
        } else {
          stringPredikatNamaNilai = Predikat.PREDIKAT_NAMA_E;
        }

        predikatNilaiHasil.stringPredikatNilai = stringPredikatNilai;
        predikatNilaiHasil.stringNamaPredikatNilai = stringPredikatNamaNilai;

        resolve(predikatNilaiHasil);
      }
    );
  }

}

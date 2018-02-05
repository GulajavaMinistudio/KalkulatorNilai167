import { Component, OnInit } from '@angular/core';
import { UtilanPelengkap } from '../../shareds-module/utils-pelengkap';
import { DataNilaiKonversi } from '../../shareds-module/local-storages/data-nilai';
import { Subscription } from 'rxjs/Subscription';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-setelan-kalkulator',
  templateUrl: './setelan-kalkulator.component.html',
  styleUrls: ['./setelan-kalkulator.component.css']
})
export class SetelanKalkulatorComponent implements OnInit {

  nilaiTugas = '';
  nilaiUTS = '';
  nilaiUAS = '';
  nilaiAkhir = '0';
  nilaiHuruf = '-';
  nilaiPredikatKategori = '-';

  isNilaiTugasValid = true;
  isNilaiUTSValid = true;
  isNilaiUASValid = true;

  nilaiTugasKet = '0%';
  nilaiUTSKet = '0%';
  nilaiUASKet = '0%';

  dataNilaiKonversi: DataNilaiKonversi;
  dataNilaiHasil: DataNilaiKonversi;
  utilanPelengkap: UtilanPelengkap;


  stringPengaliNilaiTugas = '0';
  stringPengaliNilaiUTS = '0';
  stringPengaliNilaiUAS = '0';

  stringBatasBawahNilaiA = '0';
  stringBatasBawahNilaiB = '0';
  stringBatasBawahNilaiC = '0';
  stringBatasBawahNilaiD = '0';

  pesanInputDataNotValid = '';
  isInputDataOk = true;

  compositeSubscriber: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  getDataBatasBawahNilai() {

  }

  checkIsianNilaiBatasBawah() {


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
      }, 500
    );
  }
}

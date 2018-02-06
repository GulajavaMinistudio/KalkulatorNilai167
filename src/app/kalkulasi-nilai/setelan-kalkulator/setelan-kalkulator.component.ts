import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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

  compositeSubscriber: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
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

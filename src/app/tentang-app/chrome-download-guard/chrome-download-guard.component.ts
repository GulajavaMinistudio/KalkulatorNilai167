import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chrome-download-guard',
  templateUrl: './chrome-download-guard.component.html',
  styleUrls: ['./chrome-download-guard.component.css']
})
export class ChromeDownloadGuardComponent implements OnInit {

  titleChrome = 'Maaf, layanan web ini lebih lancar digunakan dengan menggunakan browser Google Chrome. ' +
    'Silahkan unduh Google Chrome melalui tautan di bawah ini.';

  constructor() {
  }

  ngOnInit() {
  }

}

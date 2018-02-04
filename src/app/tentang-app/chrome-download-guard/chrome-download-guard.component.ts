import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chrome-download-guard',
  templateUrl: './chrome-download-guard.component.html',
  styleUrls: ['./chrome-download-guard.component.css']
})
export class ChromeDownloadGuardComponent implements OnInit {

  titleChrome = 'Maaf, browser yang anda gunakan tidak mendukung layanan web ini. ' +
    'Untuk berselancar di internet dengan cepat, aman, dan pengalaman lebih baik, silahkan gunakan browser Google Chrome';

  constructor() {
  }

  ngOnInit() {
  }

}

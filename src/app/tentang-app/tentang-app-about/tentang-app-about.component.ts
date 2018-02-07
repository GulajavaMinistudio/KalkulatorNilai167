import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tentang-app-about',
  templateUrl: './tentang-app-about.component.html',
  styleUrls: ['./tentang-app-about.component.css']
})
export class TentangAppAboutComponent implements OnInit {

  stringTanggalSekarang: string;

  constructor(private routers: Router) { }

  ngOnInit() {
    this.getTahunSekarang();
  }

  getTahunSekarang() {

    const dateTanggal = new Date();
    this.stringTanggalSekarang = dateTanggal.getFullYear().toString();
  }

  navigasiBalik() {
    this.routers.navigate(['/hitung-nilai/kalkulator-nilai']);
  }
}

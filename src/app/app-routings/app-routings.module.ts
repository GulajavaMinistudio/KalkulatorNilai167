import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChromeBrowserGuardGuard } from './chrome-browser-guard.guard';
import { ChromeDownloadGuardComponent } from '../chrome-download-guard/chrome-download-guard.component';

const appRoutingRoot: Routes = [
  {path: '', redirectTo: 'kalkulator-nilai', pathMatch: 'full'},
  {path: '**', redirectTo: 'kalkulator-nilai'},
  {
    path: 'kalkulator-nilai', loadChildren: 'app/kalkulasi-nilai/kalkulasi-nilai.module#KalkulasiNilaiModule',
    canLoad: [ChromeBrowserGuardGuard]
  },
  {
    path: 'setelan-kalkulator', loadChildren: 'app/setelan-kalkulasi/setelan-kalkulasi.module#SetelanKalkulasiModule',
    canLoad: [ChromeBrowserGuardGuard]
  },
  {
    path: 'gunakan-chrome-dulu', component: ChromeDownloadGuardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutingRoot)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingsModule {
}

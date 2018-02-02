import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChromeBrowserGuardGuard } from './chrome-browser-guard.guard';
import { ChromeDownloadGuardComponent } from '../chrome-download-guard/chrome-download-guard.component';

const appRoutingRoot: Routes = [
  {path: '', redirectTo: 'kalkulator-nilai', pathMatch: 'full'},
  {
    path: '', loadChildren: 'app/kalkulasi-nilai/kalkulasi-nilai.module#KalkulasiNilaiModule',
    canLoad: [ChromeBrowserGuardGuard]
  },
  {
    path: 'gunakan-chrome-dulu', component: ChromeDownloadGuardComponent
  },
  {
    path: '**', redirectTo: 'kalkulator-nilai'
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

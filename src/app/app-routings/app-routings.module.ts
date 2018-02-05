import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChromeBrowserGuardGuard } from './chrome-browser-guard.guard';
import { ChromeDownloadGuardComponent } from '../tentang-app/chrome-download-guard/chrome-download-guard.component';
import { TentangAppModule } from '../tentang-app/tentang-app.module';

const appRoutingRoot: Routes = [
  {
    path: 'hitung-nilai', loadChildren: 'app/kalkulasi-nilai/kalkulasi-nilai.module#KalkulasiNilaiModule',
    canLoad: [ChromeBrowserGuardGuard]
  },
  {
    path: 'tentang-aplikasi', loadChildren: 'app/tentang-app/tentang-app.module#TentangAppModule'
  },
  {
    path: '', redirectTo: 'hitung-nilai', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'hitung-nilai'
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

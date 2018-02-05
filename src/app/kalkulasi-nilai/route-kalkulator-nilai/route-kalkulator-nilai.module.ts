import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalkulatorNilaiComponent } from '../kalkulator-nilai/kalkulator-nilai.component';
import { RouterModule, Routes } from '@angular/router';
import { KalkulasiHomepageComponent } from '../kalkulasi-homepage.component';
import { ChromeBrowserGuardGuard } from '../../app-routings/chrome-browser-guard.guard';
import { SetelanKalkulatorComponent } from '../setelan-kalkulator/setelan-kalkulator.component';

const kalkulatorRoutes: Routes = [
  {
    path: '',
    component: KalkulasiHomepageComponent,
    canActivate: [ChromeBrowserGuardGuard],
    children: [
      {
        path: '',
        canActivateChild: [ChromeBrowserGuardGuard],
        children: [
          {path: 'kalkulator-nilai', component: KalkulatorNilaiComponent},
          {path: 'setelan-kalkulator', component: SetelanKalkulatorComponent},
          {path: '', redirectTo: 'kalkulator-nilai'}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(kalkulatorRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RouteKalkulatorNilaiModule {
}

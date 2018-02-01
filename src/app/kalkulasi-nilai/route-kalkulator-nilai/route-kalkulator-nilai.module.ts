import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalkulatorNilaiComponent } from '../kalkulator-nilai/kalkulator-nilai.component';
import { RouterModule, Routes } from '@angular/router';

const kalkulatorRoutes: Routes = [
  {path: 'kalkulator-nilai', component: KalkulatorNilaiComponent}
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

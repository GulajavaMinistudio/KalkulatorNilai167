import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetelanKalkulatorComponent } from '../setelan-kalkulator/setelan-kalkulator.component';

const setelanKalkulatorRoutes: Routes = [
  {path: 'setelan-kalkulator', component: SetelanKalkulatorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(setelanKalkulatorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RouteSetelanNilaiModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SetelanKalkulatorComponent } from './setelan-kalkulator/setelan-kalkulator.component';
import { RouteSetelanNilaiModule } from './route-setelan-nilai/route-setelan-nilai.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouteSetelanNilaiModule
  ],
  declarations: [SetelanKalkulatorComponent]
})
export class SetelanKalkulasiModule {
}

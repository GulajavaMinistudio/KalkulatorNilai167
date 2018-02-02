import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalkulatorNilaiComponent } from './kalkulator-nilai/kalkulator-nilai.component';
import { FormsModule } from '@angular/forms';
import { KalkulasiNilaiService } from './kalkulasi-nilai.service';
import { RouteKalkulatorNilaiModule } from './route-kalkulator-nilai/route-kalkulator-nilai.module';
import { KalkulasiHomepageComponent } from './kalkulasi-homepage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouteKalkulatorNilaiModule
  ],
  declarations: [
    KalkulatorNilaiComponent,
    KalkulasiHomepageComponent
  ],
  providers: [
    KalkulasiNilaiService
  ]
})
export class KalkulasiNilaiModule {
}

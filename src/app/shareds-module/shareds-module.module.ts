import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresDataService } from './stores-data.service';
import { DataNilaiPenghitungService } from './data-nilai-penghitung.service';
import { StateCommunicationComponentsService } from './busdata/state-communication-components.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StoresDataService,
    StateCommunicationComponentsService,
    DataNilaiPenghitungService
  ]
})
export class SharedsModuleModule {
}

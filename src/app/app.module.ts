import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChromeDownloadGuardComponent } from './chrome-download-guard/chrome-download-guard.component';
import { AuthBrowserTipeService } from './app-routings/auth-browser-tipe.service';
import { StateCommunicationComponentsService } from './shareds-module/busdata/state-communication-components.service';
import { DataNilaiPenghitungService } from './shareds-module/data-nilai-penghitung.service';
import { FormsModule } from '@angular/forms';
import { SetelanKalkulasiModule } from './kalkulasi-nilai/setelan-kalkulasi/setelan-kalkulasi.module';
import { SharedsModuleModule } from './shareds-module/shareds-module.module';
import { AppRoutingsModule } from './app-routings/app-routings.module';
import { ChromeBrowserGuardGuard } from './app-routings/chrome-browser-guard.guard';


@NgModule({
  declarations: [
    AppComponent,
    ChromeDownloadGuardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SetelanKalkulasiModule,
    SharedsModuleModule,
    AppRoutingsModule
  ],
  providers: [
    AuthBrowserTipeService,
    ChromeBrowserGuardGuard,
    StateCommunicationComponentsService,
    DataNilaiPenghitungService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

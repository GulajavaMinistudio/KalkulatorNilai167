import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChromeDownloadGuardComponent } from './tentang-app/chrome-download-guard/chrome-download-guard.component';
import { AuthBrowserTipeService } from './app-routings/auth-browser-tipe.service';
import { StateCommunicationComponentsService } from './shareds-module/busdata/state-communication-components.service';
import { DataNilaiPenghitungService } from './shareds-module/data-nilai-penghitung.service';
import { FormsModule } from '@angular/forms';
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

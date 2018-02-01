import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChromeDownloadGuardComponent } from './chrome-download-guard/chrome-download-guard.component';
import { AuthBrowserTipeService } from './app-routings/auth-browser-tipe.service';


@NgModule({
  declarations: [
    AppComponent,
    ChromeDownloadGuardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AuthBrowserTipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

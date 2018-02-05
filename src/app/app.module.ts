import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthBrowserTipeService } from './app-routings/auth-browser-tipe.service';
import { FormsModule } from '@angular/forms';
import { SharedsModuleModule } from './shareds-module/shareds-module.module';
import { AppRoutingsModule } from './app-routings/app-routings.module';
import { ChromeBrowserGuardGuard } from './app-routings/chrome-browser-guard.guard';
import { HeaderMenubarComponent } from './shareds-module/header-menubar/header-menubar.component';
import { TentangAppModule } from './tentang-app/tentang-app.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderMenubarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedsModuleModule,
    AppRoutingsModule
  ],
  providers: [
    AuthBrowserTipeService,
    ChromeBrowserGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

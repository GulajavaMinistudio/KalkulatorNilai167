import { ServiceWorkerModule } from '@angular/service-worker';
import { environment} from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthBrowserTipeService } from './app-routings/auth-browser-tipe.service';
import { FormsModule } from '@angular/forms';
import { SharedsModuleModule } from './shareds-module/shareds-module.module';
import { AppRoutingsModule } from './app-routings/app-routings.module';
import { ChromeBrowserGuardGuard } from './app-routings/chrome-browser-guard.guard';
import { HeaderMenubarComponent } from './shareds-module/header-menubar/header-menubar.component';
import { CheckForUpdateService } from './worker-services/check-for-update.service';
import { LogUpdateService } from './worker-services/log-update.service';
import { PromptUpdateService } from './worker-services/prompt-update.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderMenubarComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    SharedsModuleModule,
    AppRoutingsModule
  ],
  providers: [
    AuthBrowserTipeService,
    ChromeBrowserGuardGuard,
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

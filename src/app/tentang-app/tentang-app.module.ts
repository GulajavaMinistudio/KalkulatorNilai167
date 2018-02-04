import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChromeDownloadGuardComponent } from './chrome-download-guard/chrome-download-guard.component';
import { TentangappHomeComponent } from './tentangapp-home.component';
import { TentangAppAboutComponent } from './tentang-app-about/tentang-app-about.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChromeDownloadGuardComponent,
    TentangappHomeComponent,
    TentangAppAboutComponent
  ]
})
export class TentangAppModule { }

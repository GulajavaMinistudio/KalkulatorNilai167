import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TentangappHomeComponent } from '../tentangapp-home.component';
import { ChromeDownloadGuardComponent } from '../chrome-download-guard/chrome-download-guard.component';
import { TentangAppAboutComponent } from '../tentang-app-about/tentang-app-about.component';
import { ChromeBrowserGuardGuard } from '../../app-routings/chrome-browser-guard.guard';

const TentangAppRoutes: Routes = [
  {
    path: '',
    component: TentangappHomeComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'about-app',
            component: TentangAppAboutComponent,
            canActivate: [ChromeBrowserGuardGuard]
          },
          {
            path: '',
            redirectTo: 'about-app'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TentangAppRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutingTentangAppModule {
}

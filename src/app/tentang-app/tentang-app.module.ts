import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TentangappHomeComponent } from './tentangapp-home.component';
import { TentangAppAboutComponent } from './tentang-app-about/tentang-app-about.component';
import { RoutingTentangAppModule } from './routing-tentang-app/routing-tentang-app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingTentangAppModule
  ],
  declarations: [
    TentangAppAboutComponent,
    TentangappHomeComponent
  ]
})
export class TentangAppModule {
}

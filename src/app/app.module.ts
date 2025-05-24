// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { ColorService } from './services/color.service';
import { LocalStorageService } from './services/local-storage.service';
import { SettingsComponent } from './components/settings/settings.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {FormsModule} from "@angular/forms";
import { StripedCircleComponent } from './components/striped-circle/striped-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    TutorialComponent,
    SettingsComponent,
    StripedCircleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ColorPickerModule,
        FormsModule
    ],
  providers: [ColorService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

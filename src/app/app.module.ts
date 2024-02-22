import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { ColorService } from './services/color.service';
import { SettingsComponent } from './components/settings/settings.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    TutorialComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule
  ],
  providers: [ColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

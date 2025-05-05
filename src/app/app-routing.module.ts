// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClockComponent } from './components/clock/clock.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: 'clock', component: ClockComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/clock', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

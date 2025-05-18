// src/app/components/settings/settings.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { AnimationService } from 'src/app/services/animation.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  clockColors: Record<string, string> = {};
  colorLabels: Record<string, string> = {
    colorWhenUsedForHoursAndMinutes: 'Hours and Minutes',
    colorWhenUsedForHours: 'Hours Only',
    colorWhenUsedForMinutes: 'Minutes Only',
    colorWhenNotUsed: 'Not Used',
    clockBackGroundColorArrayStartColor: 'Background Start Color',
    clockBackGroundColorArrayEndColor: 'Background End Color',
    secondsCounterArrayStartColor: 'Seconds Counter Start',
    secondsCounterArrayEndColor: 'Seconds Counter End'
  };

// Active tab state
  activeTab: string = 'colorSettings';
  spinSpeed: number = 60;
  constructor(private colorService: ColorService, private router: Router, private animationService: AnimationService) {}

  ngOnInit(): void {
    this.clockColors = { ...this.colorService.getClockColors() };
    this.spinSpeed = this.animationService.getSpinSpeed();
  }

  updateSpinSpeed(): void {
    this.animationService.setSpinSpeed(this.spinSpeed);
  }

  onColorChange(event: Event, colorKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.updateColor(colorKey, input.value);
    }
  }

  updateColor(colorKey: string, colorValue: string): void {
    this.clockColors[colorKey] = colorValue;
    this.colorService.updateColor(colorKey, colorValue);
  }

  resetColors(): void {
    this.colorService.resetColors();
    this.clockColors = { ...this.colorService.getClockColors() };
  }

  // Handle the promise returned by navigate
  backToClock(): void {
    this.router.navigate(['/clock']).catch(err => {
      console.error('Navigation failed:', err);
    });
  }
  // Set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}

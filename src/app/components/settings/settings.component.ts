// src/app/components/settings/settings.component.ts
import {Component, OnInit} from '@angular/core';
import {ColorService} from 'src/app/services/color.service';
import {AnimationService} from 'src/app/services/animation.service';
import {DisplayService} from 'src/app/services/display.service';
import {SettingsOverlayService} from "../../services/settings-overlay.service";

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
  timeColors = [
    { key: 'colorWhenUsedForHoursAndMinutes' },
    { key: 'colorWhenUsedForHours' },
    { key: 'colorWhenUsedForMinutes' },
    { key: 'colorWhenNotUsed' }
  ];

  secondsCounterColors = [
    { key: 'secondsCounterArrayStartColor' },
    { key: 'secondsCounterArrayEndColor' }
  ];

  backgroundColors = [
    { key: 'clockBackGroundColorArrayStartColor' },
    { key: 'clockBackGroundColorArrayEndColor' }
  ];

// Active tab state
  activeTab: string = 'displaySettings';
  showDigitalTime: boolean = true;
  showCalculationPanel: boolean = false;
  spinSpeed: number = 60;

  constructor(
    private colorService: ColorService,
    public settingsOverlayService: SettingsOverlayService,
    private displayService: DisplayService,
    private animationService: AnimationService) {
  }

  ngOnInit(): void {
    this.clockColors = {...this.colorService.getClockColors()};
    this.showDigitalTime = this.displayService.isDigitalTimeVisible();
    this.showCalculationPanel = this.displayService.isCalculationPanelVisible();
    this.spinSpeed = this.animationService.getSpinSpeed();
  }

  toggleDigitalTime(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showDigitalTime = checkbox.checked;
    this.displayService.setDigitalTimeVisibility(this.showDigitalTime);
  }

  toggleCalculationPanel(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showCalculationPanel = checkbox.checked;
    this.displayService.setCalculationPanelVisibility(this.showCalculationPanel);
  }

  updateSpinSpeed(): void {
    this.animationService.setSpinSpeed(this.spinSpeed);
  }

  onColorChange(event: Event, colorKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.clockColors[colorKey] = input.value;
      this.colorService.updateColor(colorKey, input.value);
    }
  }

  updateColor(colorKey: string, colorValue: string): void {
    this.clockColors[colorKey] = colorValue;
    this.colorService.updateColor(colorKey, colorValue);
  }

  resetColors(): void {
    this.colorService.resetColors();
    this.clockColors = {...this.colorService.getClockColors()};
  }

  // Handle the promise returned by navigate
  backToClock(): void {
    this.settingsOverlayService.hideSettings();
  }

  // Set the active tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  closeOnBackdropClick(event: MouseEvent): void {
    // Check if the click was directly on the overlay, not on its children
    if ((event.target as HTMLElement).classList.contains('settings-overlay')) {
      this.settingsOverlayService.hideSettings();
    }
  }
}

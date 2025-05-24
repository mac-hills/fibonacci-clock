// src/app/components/settings/settings.component.ts
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { AnimationService } from 'src/app/services/animation.service';
import { DisplayService } from 'src/app/services/display.service';
import { SettingsOverlayService } from "../../services/settings-overlay.service";

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
    secondsCounterArrayEndColor: 'Seconds Counter End',
    stripeColor: 'Stripe Color'
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

  activeTab: string = 'displaySettings';
  showDigitalTime: boolean = true;
  showCalculationPanel: boolean = false;
  showSecondsCounter: boolean = true;
  showStripeShadow: boolean = false;
  spinSpeed: number = 60;
  stripesSpinSpeed: number = 60;
  stripeWidth: number = 1.0;
  stripeColor: string = '#ffffff';
  stripeLength: number = 0.99;
  innerLength: number = 0.85;

  constructor(
    private colorService: ColorService,
    public settingsOverlayService: SettingsOverlayService,
    private displayService: DisplayService,
    private animationService: AnimationService
  ) {}

  ngOnInit(): void {
    this.clockColors = {...this.colorService.getClockColors()};
    this.showDigitalTime = this.displayService.isDigitalTimeVisible();
    this.showCalculationPanel = this.displayService.isCalculationPanelVisible();
    this.showStripeShadow = this.displayService.isStripeShadowEnabled();
    this.spinSpeed = this.animationService.getSpinSpeed();
    this.stripesSpinSpeed = this.animationService.getStripesSpinSpeed();
    this.stripeWidth = this.displayService.getStripeWidth();
    this.stripeColor = this.displayService.getStripeColor();
    this.stripeLength = this.displayService.getStripeLength();
    this.innerLength = this.displayService.getStripeInnerLength();
  }
  updateStripeWidth(): void {
    this.displayService.setStripeWidth(this.stripeWidth);
  }
  updateStripesSpinSpeed(): void {
    this.animationService.setStripesSpinSpeed(this.stripesSpinSpeed);
  }

  updateStripeColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.stripeColor = input.value;
      this.displayService.setStripeColor(this.stripeColor);
    }
  }

  updateStripeLength(): void {
    this.displayService.setStripeLength(this.stripeLength);
  }

  updateInnerLength(): void {
    this.displayService.setStripeInnerLength(this.innerLength);
  }
  toggleStripeShadow(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showStripeShadow = checkbox.checked;
    this.displayService.setStripeShadow(this.showStripeShadow);
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

  toggleSecondsCounter(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showSecondsCounter = checkbox.checked;
    this.displayService.setSecondsCounterVisibility(this.showSecondsCounter);
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

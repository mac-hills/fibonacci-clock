// src/app/components/settings/settings.component.ts
import {Component, NgZone, OnInit} from '@angular/core';
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
    private ngZone: NgZone,
    public settingsOverlayService: SettingsOverlayService,
    private displayService: DisplayService,
    private animationService: AnimationService
  ) {this.settingsOverlayService.visibility$.subscribe(visible => {
    if (visible) {
      // Update state when settings panel becomes visible
      this.showSecondsCounter = this.displayService.isSecondsCounterVisible();
    }
  });}

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
  ngAfterViewInit(): void {
    // Initialize sliders after view is initialized
    setTimeout(() => this.initSliders(), 100);
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    // Initialize sliders after tab content is rendered
    setTimeout(() => this.initSliders(), 100);
  }

  // Update slider functions with fill effect updating
  updateSpinSpeed(): void {
    this.animationService.setSpinSpeed(this.spinSpeed);
    this.updateSliderFill('spin-speed');
  }

  updateStripesSpinSpeed(): void {
    this.animationService.setStripesSpinSpeed(this.stripesSpinSpeed);
    this.updateSliderFill('stripes-spin-speed');
  }

  updateStripeLength(): void {
    this.displayService.setStripeLength(this.stripeLength);
    this.updateSliderFill('stripe-length');
  }

  updateInnerLength(): void {
    this.displayService.setStripeInnerLength(this.innerLength);
    this.updateSliderFill('inner-length');
  }

  updateStripeWidth(): void {
    this.displayService.setStripeWidth(this.stripeWidth);
    this.updateSliderFill('stripe-width');
  }

  // Helper method to update a specific slider's fill
  updateSliderFill(sliderId: string): void {
    const slider = document.getElementById(sliderId) as HTMLInputElement;
    if (slider) {
      const value = (parseInt(slider.value) - parseInt(slider.min)) /
        (parseInt(slider.max) - parseInt(slider.min)) * 100;
      slider.style.setProperty('--slider-fill', `${value}%`);
    }
  }

  // Initialize all sliders
  initSliders(): void {
    this.ngZone.runOutsideAngular(() => {
      const sliders = document.querySelectorAll('.full-width-slider') as NodeListOf<HTMLInputElement>;

      sliders.forEach(slider => {
        // Set initial position
        const value = (parseFloat(slider.value) - parseFloat(slider.min)) /
          (parseFloat(slider.max) - parseFloat(slider.min)) * 100;
        slider.style.setProperty('--slider-fill', `${value}%`);

        // Remove old event listeners to avoid duplicates
        slider.removeEventListener('input', this.handleSliderInput);

        // Add new event listener
        slider.addEventListener('input', this.handleSliderInput);
      });
    });
  }

  // Handler for slider input events
  handleSliderInput = (event: Event): void => {
    const slider = event.target as HTMLInputElement;
    const value = (parseFloat(slider.value) - parseFloat(slider.min)) /
      (parseFloat(slider.max) - parseFloat(slider.min)) * 100;
    slider.style.setProperty('--slider-fill', `${value}%`);
  };

  updateStripeColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.stripeColor = input.value;
      this.displayService.setStripeColor(this.stripeColor);
    }
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
    this.displayService.setStripeColor('#ffffff');
    this.stripeColor = '#ffffff';
  }

  // Handle the promise returned by navigate
  backToClock(): void {
    this.settingsOverlayService.hideSettings();
  }


  closeOnBackdropClick(event: MouseEvent): void {
    // Check if the click was directly on the overlay, not on its children
    if ((event.target as HTMLElement).classList.contains('settings-overlay')) {
      this.settingsOverlayService.hideSettings();
    }
  }

}

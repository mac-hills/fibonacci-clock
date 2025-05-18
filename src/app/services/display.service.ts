import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private readonly SHOW_DIGITAL_TIME_KEY = 'fibonacciClockShowDigitalTime';
  private readonly SHOW_CALCULATION_PANEL_KEY = 'fibonacciClockShowCalculationPanel';
  private defaultShowDigitalTime = false;
  private defaultShowCalculationPanel = false;

  constructor(private localStorageService: LocalStorageService) { }

  isDigitalTimeVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.SHOW_DIGITAL_TIME_KEY, this.defaultShowDigitalTime);
  }

  setDigitalTimeVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.SHOW_DIGITAL_TIME_KEY, isVisible);
  }
  isCalculationPanelVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.SHOW_CALCULATION_PANEL_KEY, this.defaultShowCalculationPanel);
  }

  setCalculationPanelVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.SHOW_CALCULATION_PANEL_KEY, isVisible);
  }
}

import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private readonly DIGITAL_TIME_KEY = 'showDigitalTime';
  private readonly CALCULATION_PANEL_KEY = 'showCalculationPanel';
  private readonly STRIPE_COLOR_KEY = 'stripeColor';
  private readonly STRIPE_LENGTH_KEY = 'stripeLength';
  private readonly STRIPE_INNER_LENGTH_KEY = 'stripeInnerLength';

  constructor(private localStorageService: LocalStorageService) {}

  isDigitalTimeVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.DIGITAL_TIME_KEY, true);
  }

  setDigitalTimeVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.DIGITAL_TIME_KEY, isVisible);
  }

  isCalculationPanelVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.CALCULATION_PANEL_KEY, false);
  }

  setCalculationPanelVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.CALCULATION_PANEL_KEY, isVisible);
  }

  getStripeColor(): string {
    return this.localStorageService.getItem<string>(this.STRIPE_COLOR_KEY, '#ffffff');
  }

  setStripeColor(color: string): void {
    this.localStorageService.setItem(this.STRIPE_COLOR_KEY, color);
  }

  getStripeLength(): number {
    return this.localStorageService.getItem<number>(this.STRIPE_LENGTH_KEY, 0.99);
  }

  setStripeLength(length: number): void {
    this.localStorageService.setItem(this.STRIPE_LENGTH_KEY, length);
  }

  getStripeInnerLength(): number {
    return this.localStorageService.getItem<number>(this.STRIPE_INNER_LENGTH_KEY, 0.85);
  }

  setStripeInnerLength(length: number): void {
    this.localStorageService.setItem(this.STRIPE_INNER_LENGTH_KEY, length);
  }
}

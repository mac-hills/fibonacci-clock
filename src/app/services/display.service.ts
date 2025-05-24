import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private readonly SHOW_DIGITAL_TIME_KEY = 'fibonacciClockShowDigitalTime';
  private readonly STRIPE_SHADOW_KEY = 'stripeShadow';
  private defaultShowStripeShadow: boolean = false;
  private readonly DIGITAL_TIME_KEY = 'showDigitalTime';
  private readonly CALCULATION_PANEL_KEY = 'showCalculationPanel';
  private readonly SECONDS_COUNTER_KEY = 'showSecondsCounter';
  private readonly SHOW_CALCULATION_PANEL_KEY = 'fibonacciClockShowCalculationPanel';
  private readonly STRIPE_WIDTH_KEY = 'stripeWidth';
  private readonly STRIPE_COLOR_KEY = 'stripeColor';
  private readonly STRIPE_LENGTH_KEY = 'stripeLength';
  private readonly STRIPE_INNER_LENGTH_KEY = 'stripeInnerLength';

  private defaultShowDigitalTime: boolean = true;
  private defaultShowCalculationPanel: boolean = false;
  private defaultShowSecondsCounter: boolean = true;
  private stripeShadowSubject = new BehaviorSubject<boolean>(false);
  public stripeShadow$: Observable<boolean> = this.stripeShadowSubject.asObservable();
  private digitalTimeSubject = new BehaviorSubject<boolean>(false);
  public digitalTime$: Observable<boolean> = this.digitalTimeSubject.asObservable();

  private calculationPanelSubject = new BehaviorSubject<boolean>(false);
  public calculationPanel$: Observable<boolean> = this.calculationPanelSubject.asObservable();

  private secondsCounterSubject = new BehaviorSubject<boolean>(true);
  public secondsCounter$: Observable<boolean> = this.secondsCounterSubject.asObservable();

  private stripeColorSubject = new BehaviorSubject<string>('#ffffff');
  public stripeColor$: Observable<string> = this.stripeColorSubject.asObservable();

  private stripeLengthSubject = new BehaviorSubject<number>(0.99);
  public stripeLength$: Observable<number> = this.stripeLengthSubject.asObservable();

  private stripeInnerLengthSubject = new BehaviorSubject<number>(0.85);
  public stripeInnerLength$: Observable<number> = this.stripeInnerLengthSubject.asObservable();

  private stripeWidthSubject = new BehaviorSubject<number>(1.0);
  public stripeWidth$: Observable<number> = this.stripeWidthSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const showSecondsCounter = this.isSecondsCounterVisible();
    const showDigitalTime = this.isDigitalTimeVisible();
    const showCalculationPanel = this.isCalculationPanelVisible();
    const stripeColor = this.getStripeColor();
    const stripeLength = this.getStripeLength();
    const stripeInnerLength = this.getStripeInnerLength();
    const stripeWidth = this.getStripeWidth();
    const showStripeShadow = this.isStripeShadowEnabled();

    this.stripeShadowSubject.next(showStripeShadow);
    this.secondsCounterSubject.next(showSecondsCounter);
    this.digitalTimeSubject.next(showDigitalTime);
    this.calculationPanelSubject.next(showCalculationPanel);
    this.stripeColorSubject.next(stripeColor);
    this.stripeLengthSubject.next(stripeLength);
    this.stripeInnerLengthSubject.next(stripeInnerLength);
    this.stripeWidthSubject.next(stripeWidth);
  }

  getStripeWidth(): number {
    return this.localStorageService.getItem<number>(this.STRIPE_WIDTH_KEY, 1.0);
  }

  setStripeWidth(width: number): void {
    this.localStorageService.setItem(this.STRIPE_WIDTH_KEY, width);
    this.stripeWidthSubject.next(width);
  }

  isDigitalTimeVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.SHOW_DIGITAL_TIME_KEY, this.defaultShowDigitalTime);
  }

  setDigitalTimeVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.SHOW_DIGITAL_TIME_KEY, isVisible);
    this.digitalTimeSubject.next(isVisible);
  }

  isCalculationPanelVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.SHOW_CALCULATION_PANEL_KEY, this.defaultShowCalculationPanel);
  }

  setCalculationPanelVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.SHOW_CALCULATION_PANEL_KEY, isVisible);
    this.calculationPanelSubject.next(isVisible);
  }

  isSecondsCounterVisible(): boolean {
    return this.localStorageService.getItem<boolean>(this.SECONDS_COUNTER_KEY, this.defaultShowSecondsCounter);
  }

  setSecondsCounterVisibility(isVisible: boolean): void {
    this.localStorageService.setItem(this.SECONDS_COUNTER_KEY, isVisible);
    this.secondsCounterSubject.next(isVisible); // Update the correct subject
  }
  isStripeShadowEnabled(): boolean {
    return this.localStorageService.getItem<boolean>(this.STRIPE_SHADOW_KEY, this.defaultShowStripeShadow);
  }

  setStripeShadow(enabled: boolean): void {
    this.localStorageService.setItem(this.STRIPE_SHADOW_KEY, enabled);
    this.stripeShadowSubject.next(enabled);
  }

  getStripeColor(): string {
    return this.localStorageService.getItem<string>(this.STRIPE_COLOR_KEY, '#ffffff');
  }

  setStripeColor(color: string): void {
    this.localStorageService.setItem(this.STRIPE_COLOR_KEY, color);
    this.stripeColorSubject.next(color);
  }

  getStripeLength(): number {
    return this.localStorageService.getItem<number>(this.STRIPE_LENGTH_KEY, 0.99);
  }

  setStripeLength(length: number): void {
    this.localStorageService.setItem(this.STRIPE_LENGTH_KEY, length);
    this.stripeLengthSubject.next(length);
  }

  getStripeInnerLength(): number {
    return this.localStorageService.getItem<number>(this.STRIPE_INNER_LENGTH_KEY, 0.85);
  }

  setStripeInnerLength(length: number): void {
    this.localStorageService.setItem(this.STRIPE_INNER_LENGTH_KEY, length);
    this.stripeInnerLengthSubject.next(length);
  }
}

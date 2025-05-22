import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private readonly SHOW_DIGITAL_TIME_KEY = 'fibonacciClockShowDigitalTime';
  private readonly SHOW_CALCULATION_PANEL_KEY = 'fibonacciClockShowCalculationPanel';
  private defaultShowDigitalTime = false;
  private defaultShowCalculationPanel = false;

  private digitalTimeSubject = new BehaviorSubject<boolean>(false);
  public digitalTime$: Observable<boolean> = this.digitalTimeSubject.asObservable();

  private calculationPanelSubject = new BehaviorSubject<boolean>(false);
  public calculationPanel$: Observable<boolean> = this.calculationPanelSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const showDigitalTime = this.isDigitalTimeVisible();
    const showCalculationPanel = this.isCalculationPanelVisible();

    this.digitalTimeSubject.next(showDigitalTime);
    this.calculationPanelSubject.next(showCalculationPanel);
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
}

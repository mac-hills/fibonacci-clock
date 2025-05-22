// color.service.ts
import { Injectable } from '@angular/core';
import { clockColors } from '../resources/color-resources/clockColors';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private readonly CLOCK_COLORS_KEY = 'clockColors';
  private colors: Record<string, string>;
  private colorsSubject = new BehaviorSubject<Record<string, string>>({});
  public colors$: Observable<Record<string, string>> = this.colorsSubject.asObservable();

  public currentIndexBackgroundArray = 0;
  public currentIndexSecondsCounterArray = 0;
  public currentColorIndex = 0;
  private letters = '0123456789ABCDEF';
  public colorsArrayBackGround: string[] = [];
  public colorsArraySecondsCounter: string[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.colors = this.localStorageService.getItem<Record<string, string>>(
      this.CLOCK_COLORS_KEY,
      { ...clockColors }
    );
    this.colorsSubject.next(this.colors);
    this.regenerateColorArrays();
  }
  getClockColors(): Record<string, string> {
    return this.colors;
  }
  updateColor(colorKey: string, colorValue: string): void {
    this.colors[colorKey] = colorValue;
    this.saveColors();
    this.regenerateColorArrays();
    this.colorsSubject.next({...this.colors});
  }
  saveColors(): void {
    this.localStorageService.setItem(this.CLOCK_COLORS_KEY, this.colors);
  }
  resetColors(): void {
    this.colors = { ...clockColors };
    this.saveColors();
    this.regenerateColorArrays();
    this.colorsSubject.next({...this.colors});
  }
  private regenerateColorArrays(): void {
    const clockBackGroundColorArrayStartColor = this.getClockBackgroundColorStart();
    const clockBackGroundColorArrayEndColor = this.getClockBackgroundColorEnd();
    const clockBackGroundColorSteps = 60;
    const startColorSecondsCounter = this.getSecondsCounterArrayStartColor();
    const endColorSecondsCounter = this.getSecondsCounterArrayEndColor();
    const stepsSecondsCounter = 1;
    this.colorsArrayBackGround = this.generateColorArray(
      clockBackGroundColorArrayStartColor,
      clockBackGroundColorArrayEndColor,
      clockBackGroundColorSteps
    );
    this.colorsArraySecondsCounter = this.generateColorArray(
      startColorSecondsCounter,
      endColorSecondsCounter,
      stepsSecondsCounter
    );
  }
  getColorWhenUsedForHoursAndMinutes(): string {
    return this.colors['colorWhenUsedForHoursAndMinutes'];
  }

  getColorWhenUsedForHours(): string {
    return this.colors['colorWhenUsedForHours'];
  }

  getColorWhenUsedForMinutes(): string {
    return this.colors['colorWhenUsedForMinutes'];
  }

  getColorWhenNotUsed(): string {
    return this.colors['colorWhenNotUsed'];
  }

  getClockBackgroundColorStart(): string {
    return this.colors['clockBackGroundColorArrayStartColor'];
  }

  getClockBackgroundColorEnd(): string {
    return this.colors['clockBackGroundColorArrayEndColor'];
  }

  getSecondsCounterArrayStartColor(): string {
    return this.colors['secondsCounterArrayStartColor'];
  }

  getSecondsCounterArrayEndColor(): string {
    return this.colors['secondsCounterArrayEndColor'];
  }

  getColorsArryForBackground(): string[] {
    return this.colorsArrayBackGround;
  }

  getColorsArryForSecondsCounterShape(): string[] {
    return this.colorsArraySecondsCounter;
  }

  getRandomColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += this.letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getNextColorForBackground(): string {
    const color = this.colorsArrayBackGround[this.currentIndexBackgroundArray];
    this.currentIndexBackgroundArray = (this.currentIndexBackgroundArray + 1) % this.colorsArrayBackGround.length;
    return color;
  }

  getNextColorFromSecondsCounter(array: string[]): string {
    const color = array[this.currentIndexSecondsCounterArray];
    this.currentIndexSecondsCounterArray = (this.currentIndexSecondsCounterArray + 1) % this.colorsArraySecondsCounter.length;
    return color;
  }

  generateColorArray(startColor: string, endColor: string, steps: number): string[] {
    const colorsArray = [];
    const startRGB = this.extractRGBValues(startColor);
    const endRGB = this.extractRGBValues(endColor);
    for (let i = 0; i <= steps; i++) {
      const currentColor = this.interpolateColor(startRGB, endRGB, i / steps);
      colorsArray.push(`rgb(${currentColor.join(',')})`);
    }
    return colorsArray;
  }

  private extractRGBValues(color: string): number[] {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return [r, g, b];
    }
    else {
      const matchResult = color.match(/\d+/g);
      if (matchResult) {
        return matchResult.map(Number);
      } else {
        console.error('Invalid color format:', color);
        return [0, 0, 0];
      }
    }
  }

  private interpolateColor(startColor: number[], endColor: number[], ratio: number): number[] {
    return startColor.map((component, index) =>
      Math.round(component + (endColor[index] - component) * ratio)
    );
  }
}

// src/app/services/color.service.ts
import { Injectable } from '@angular/core';
import { clockColors } from '../resources/color-resources/clockColors';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private readonly CLOCK_COLORS_KEY = 'clockColors';
  private colors: Record<string, string>;

  public currentIndexBackgroundArray = 0;
  public currentIndexSecondsCounterArray = 0;
  public currentColorIndex = 0;
  private letters = '0123456789ABCDEF';

  // generating a colors array for the background color
  public colorsArrayBackGround: string[] = [];

  // generating a colors array for the seconds counter
  public colorsArraySecondsCounter: string[] = [];

  constructor(private localStorageService: LocalStorageService) {
    // Load colors from localStorage or use defaults
    this.colors = this.localStorageService.getItem<Record<string, string>>(
      this.CLOCK_COLORS_KEY,
      { ...clockColors }
    );

    this.regenerateColorArrays();
  }

  // Access all clock colors
  getClockColors(): Record<string, string> {
    return this.colors;
  }

  // Update a specific color and save to localStorage
  updateColor(colorKey: string, colorValue: string): void {
    this.colors[colorKey] = colorValue;
    this.saveColors();
    this.regenerateColorArrays();
  }

  // Save all colors to localStorage
  saveColors(): void {
    this.localStorageService.setItem(this.CLOCK_COLORS_KEY, this.colors);
  }

  // Reset colors to default
  resetColors(): void {
    this.colors = { ...clockColors };
    this.saveColors();
    this.regenerateColorArrays();
  }

  // Regenerate color arrays based on current color settings
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

  // Access specific colors
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

  // these methods generates an array of colors that gradually changes from the starting color to the end color in a given number of steps
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
    const matchResult = color.match(/\d+/g);
    if (matchResult) {
      return matchResult.map(Number);
    } else {
      console.error('Invalid color format');
      return [0, 0, 0]; // Default to black
    }
  }

  private interpolateColor(startColor: number[], endColor: number[], ratio: number): number[] {
    return startColor.map((component, index) =>
      Math.round(component + (endColor[index] - component) * ratio)
    );
  }
}

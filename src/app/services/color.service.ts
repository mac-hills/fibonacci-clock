import { Injectable } from '@angular/core';
import { clockColors } from '../resources/color-resources/clockColors';
@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // Access all clock colors
  getClockColors() {
    return clockColors;
  }

  // Access specific colors
  getColorWhenUsedForHoursAndMinutes() {
    return clockColors['colorWhenUsedForHoursAndMinutes'];

  }  
  
  getColorWhenUsedForHours() {
    return clockColors['colorWhenUsedForHours'];
  }

  getColorWhenUsedForMinutes()  {
    return clockColors['colorWhenUsedForMinutes'];
  }

  getColorWhenNotUsed()  {
    return clockColors['colorWhenNotUsed'];
  }

  getClockBackgroundColorStart()  {
    return clockColors['clockBackGroundColorArrayStartColor'];
  }

  getClockBackgroundColorEnd()  {
    return clockColors['clockBackGroundColorArrayEndColor'];
  }

  getSecondsCounterArrayStartColor() {
    return clockColors['secondsCounterArrayStartColor'];
  }

  getSecondsCounterArrayEndColor()  {
    return clockColors['secondsCounterArrayEndColor'];
  }

  public currentIndexBackgroundArray = 0;
  public currentIndexSecondsCounterArray = 0;
  public currentColorIndex = 0;
  private letters = '0123456789ABCDEF';

  // generating a colors array for the background color
  public colorsArrayBackGround: string[] = [];
  clockBackGroundColorArrayStartColor = this.getClockBackgroundColorStart();
  clockBackGroundColorArrayEndColor = this.getClockBackgroundColorEnd();
  clockBackGroundColorSteps = 60;

  // generating a colors array for the seconds counter
  public colorsArraySecondsCounter: string[] = [];
  startColorSecondsCounter = this.getSecondsCounterArrayStartColor();
  endColorSecondsCounter = this.getSecondsCounterArrayEndColor();
  stepsSecondsCounter = 1;
  
  constructor() {
    this.colorsArrayBackGround = this.generateColorArray(
      this.clockBackGroundColorArrayStartColor, 
      this.clockBackGroundColorArrayEndColor, 
      this.clockBackGroundColorSteps);

    this.colorsArraySecondsCounter = this.generateColorArray(
      this.startColorSecondsCounter, 
      this.endColorSecondsCounter, 
      this.stepsSecondsCounter);
    console.log('Seconds Counter Colors:', this.colorsArraySecondsCounter);
  }
  
  getColorsArryForBackground(){
    return this.colorsArrayBackGround;
  }

  getColorsArryForSecondsCounterShape(){
    return this.colorsArraySecondsCounter;
  }
 
  getRandomColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += this.letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // getNextColor() {
  //   const color = this.colorsArrayBackGround[this.currentColorIndex];
  //   this.currentColorIndex = (this.currentColorIndex + 1) % this.colorsArrayBackGround.length;
  //   return color;
  // }

  getNextColorForBackground() {
    const color = this.colorsArrayBackGround[this.currentIndexBackgroundArray];
    this.currentIndexBackgroundArray = (this.currentIndexBackgroundArray + 1) % this.colorsArrayBackGround.length;
    return color;
  }
  
  getNextColorFromSecondsCounter(array: string[]): string {
    const color = array[this.currentIndexSecondsCounterArray];
    this.currentIndexSecondsCounterArray = (this.currentIndexSecondsCounterArray + 1) % this.colorsArraySecondsCounter.length;
    return color;
  }

  // these methods generates an array of colors that gradually changes from the starting color to the end color in a given number of steps (use 60 if you want to match a minute)
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
      return [];
    }
  }

  private interpolateColor(startColor: number[], endColor: number[], ratio: number): number[] {
    return startColor.map((component, index) =>
      Math.round(component + (endColor[index] - component) * ratio)
    );
  }

}

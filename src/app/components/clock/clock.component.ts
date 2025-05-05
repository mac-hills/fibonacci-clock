import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(private router: Router, private colorService: ColorService){}
   // clock colors
  currentHour!: number;
  currentMinutes!: number;
  currentSeconds!: number;
  colorWhenUsedForHoursAndMinutes = this.colorService.getClockColors()['colorWhenUsedForHoursAndMinutes'];
  colorWhenUsedForHours = this.colorService.getClockColors()['colorWhenUsedForHours'];
  colorWhenUsedForMinutes = this.colorService.getClockColors()['colorWhenUsedForMinutes'];
  colorWhenNotUsed: string = this.colorService.getClockColors()['colorWhenNotUsed'];
  secondsCounterArrayStartColor = this.colorService.getClockColors()['secondsCounterArrayStartColor'];
  secondsCounterArrayEndColor = this.colorService.getClockColors()['secondsCounterArrayEndColor'];




  // color(s) for seconds counter shape
  public secondsColor = '';
  // colors for second counter shape
  private secondsColorArray = this.colorService.generateColorArray(
    this.secondsCounterArrayStartColor,
    this.secondsCounterArrayEndColor,
    2
    );

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.updateCurrentTime();
      this.setClockBackgroundColors();
      this.secondsColor=this.colorService.getNextColorFromSecondsCounter(this.secondsColorArray);
    });
  }

  onClockContainerClick() {
    this.router.navigate(['/tutorial']);
  }

  goToSettings() {
    this.router.navigate(['/settings']).catch(err => {
      console.error('Navigation failed:', err);
    });
  }
  updateCurrentTime(): void {
    const now = new Date();
    this.currentHour = now.getHours();
    this.currentMinutes = now.getMinutes();
    this.currentSeconds = now.getSeconds();
  }

  private setClockBackgroundColors(): void {
    this.setStatusFib1();
    this.setStatusFib2();
    this.setStatusFib3();
    this.setStatusFib5();
    this.setStatusFib8();
    this.setStatusFib13();
    this.setStatusFib21();
    this.setStatusFib34();
  }

  fib1UsedForMinutes : boolean = false;
  fib1UsedForHours : boolean = false;
  fib1UsedForBoth: boolean = false;

  fib12UsedForMinutes : boolean = false;
  fib12UsedForHours : boolean = false;
  fib12UsedForBoth: boolean = false;

  fib2UsedForMinutes : boolean = false;
  fib2UsedForHours : boolean = false;
  fib2UsedForBoth: boolean = false;

  fib3UsedForMinutes : boolean = false;
  fib3UsedForHours : boolean = false;
  fib3UsedForBoth: boolean = false;

  fib5UsedForMinutes : boolean = false;
  fib5UsedForHours : boolean = false;
  fib5UsedForBoth: boolean = false;

  fib8UsedForMinutes : boolean = false;
  fib8UsedForHours : boolean = false;
  fib8UsedForBoth: boolean = false;

  fib13UsedForMinutes : boolean = false;
  fib13UsedForHours : boolean = false;
  fib13UsedForBoth: boolean = false;

  fib21UsedForMinutes : boolean = false;
  fib21UsedForHours : boolean = false;
  fib21UsedForBoth: boolean = false;

  fib34UsedForMinutes : boolean = false;
  fib34UsedForHours : boolean = false;
  fib34UsedForBoth: boolean = false;

  setStatusFib1(){
    this.currentHour
    if( [1,3,4,6,9,12,14,17,19,22].includes(this.currentHour) && [1,4,6,9,12,14,17,19,22,25,27,30,33,35,38,40,43,46,48,51,53,56,59].includes(this.currentMinutes)){
      this.fib1UsedForHours = false;
      this.fib1UsedForMinutes = false;
      this.fib1UsedForBoth = true;
    } else if ( [1,3,4,6,9,12,14,17,19,22].includes(this.currentHour) && ![1,4,6,9,12,14,17,19,22,25,27,30,33,35,38,40,43,46,48,51,53,56,59].includes(this.currentMinutes)){
      this.fib1UsedForHours = true;
      this.fib1UsedForMinutes = false;
      this.fib1UsedForBoth = false;
    }else if ( ![1,3,4,6,9,12,14,17,19,22].includes(this.currentHour) && [1,4,6,9,12,14,17,19,22,25,27,30,33,35,38,40,43,46,48,51,53,56,59].includes(this.currentMinutes)){
      this.fib1UsedForHours = false;
      this.fib1UsedForMinutes = true;
      this.fib1UsedForBoth = false;
    } else {
      this.fib1UsedForHours = false;
      this.fib1UsedForMinutes = false;
      this.fib1UsedForBoth = false;
    }
  }

  setStatusFib2(){
    this.currentHour
    if([2,7,10,15,20,23].includes(this.currentHour) && [2,7,10,15,20,23,28,31,36,41,44,49,54,57].includes(this.currentMinutes)){
      this.fib2UsedForHours = false;
      this.fib2UsedForMinutes = false;
      this.fib2UsedForBoth = true;
    } else if ([2,7,10,15,20,23].includes(this.currentHour) && ![2,7,10,15,20,23,28,31,36,41,44,49,54,57].includes(this.currentMinutes)){
      this.fib2UsedForHours = true;
      this.fib2UsedForMinutes = false;
      this.fib2UsedForBoth = false;
    }else if (![2,7,10,15,20,23].includes(this.currentHour) && [2,7,10,15,20,23,28,31,36,41,44,49,54,57].includes(this.currentMinutes)){
      this.fib2UsedForHours = false;
      this.fib2UsedForMinutes = true;
      this.fib2UsedForBoth = false;
    } else {
      this.fib2UsedForHours = false;
      this.fib2UsedForMinutes = false;
      this.fib2UsedForBoth = false;
    }
  }

  setStatusFib3(){
    this.currentHour
    if( [3,4,11,12,16,17].includes(this.currentHour) && [3,4,11,12,16,17,24,25,32,33,37,38,45,46,50,51,58,59].includes(this.currentMinutes)){
      this.fib3UsedForHours = false;
      this.fib3UsedForMinutes = false;
      this.fib3UsedForBoth = true;
    } else if ( [3,4,11,12,16,17].includes(this.currentHour) && ![3,4,11,12,16,17,24,25,32,33,37,38,45,46,50,51,58,59].includes(this.currentMinutes)){
      this.fib3UsedForHours = true;
      this.fib3UsedForMinutes = false;
      this.fib3UsedForBoth = false;
    }else if (![3,4,11,12,16,17].includes(this.currentHour) && [3,4,11,12,16,17,24,25,32,33,37,38,45,46,50,51,58,59].includes(this.currentMinutes)){
      this.fib3UsedForHours = false;
      this.fib3UsedForMinutes = true;
      this.fib3UsedForBoth = false;
    } else {
      this.fib3UsedForHours = false;
      this.fib3UsedForMinutes = false;
      this.fib3UsedForBoth = false;
    }
  }

  setStatusFib5(){
    this.currentHour
    if([5,6,7,18,19,20].includes(this.currentHour) && [5,6,7,18,19,20,26,27,28,39,40,41,52,53,54].includes(this.currentMinutes)){
      this.fib5UsedForHours = false;
      this.fib5UsedForMinutes = false;
      this.fib5UsedForBoth = true;
    } else if ([5,6,7,18,19,20].includes(this.currentHour) && ![5,6,7,18,19,20,26,27,28,39,40,41,52,53,54].includes(this.currentMinutes)){
      this.fib5UsedForHours = true;
      this.fib5UsedForMinutes = false;
      this.fib5UsedForBoth = false;
    }else if (![5,6,7,18,19,20].includes(this.currentHour) && [5,6,7,18,19,20,26,27,28,39,40,41,52,53,54].includes(this.currentMinutes)){
      this.fib5UsedForHours = false;
      this.fib5UsedForMinutes = true;
      this.fib5UsedForBoth = false;
    } else {
      this.fib5UsedForHours = false;
      this.fib5UsedForMinutes = false;
      this.fib5UsedForBoth = false;
    }
  }

  setStatusFib8(){
    this.currentHour
    if( [8,9,10,11,12].includes(this.currentHour) && [8,9,10,11,12,29,30,31,32,33,42,43,44,45,46].includes(this.currentMinutes)){
      this.fib8UsedForHours = false;
      this.fib8UsedForMinutes = false;
      this.fib8UsedForBoth = true;
    } else if ( [8,9,10,11,12].includes(this.currentHour) && ![8,9,10,11,12,29,30,31,32,33,42,43,44,45,46].includes(this.currentMinutes)){
      this.fib8UsedForHours = true;
      this.fib8UsedForMinutes = false;
      this.fib8UsedForBoth = false;
    }else if ( ![8,9,10,11,12].includes(this.currentHour) && [8,9,10,11,12,29,30,31,32,33,42,43,44,45,46].includes(this.currentMinutes)){
      this.fib8UsedForHours = false;
      this.fib8UsedForMinutes = true;
      this.fib8UsedForBoth = false;
    } else {
      this.fib8UsedForHours = false;
      this.fib8UsedForMinutes = false;
      this.fib8UsedForBoth = false;
    }
  }

  setStatusFib13(){
    this.currentHour
    if( [13,14,15,16,17,18,19,20].includes(this.currentHour) && [13,14,15,16,17,18,19,20,47,48,49,50,51,52,53,54].includes(this.currentMinutes)){
      this.fib13UsedForHours = false;
      this.fib13UsedForMinutes = false;
      this.fib13UsedForBoth = true;
    } else if ( [13,14,15,16,17,18,19,20].includes(this.currentHour) && ![13,14,15,16,17,18,19,20,47,48,49,50,51,52,53,54].includes(this.currentMinutes)){
      this.fib13UsedForHours = true;
      this.fib13UsedForMinutes = false;
      this.fib13UsedForBoth = false;
    }else if ( ![13,14,15,16,17,18,19,20].includes(this.currentHour) && [13,14,15,16,17,18,19,20,47,48,49,50,51,52,53,54].includes(this.currentMinutes)){
      this.fib13UsedForHours = false;
      this.fib13UsedForMinutes = true;
      this.fib13UsedForBoth = false;
    }else {
      this.fib13UsedForHours = false;
      this.fib13UsedForMinutes = false;
      this.fib13UsedForBoth = false;
    }
  }

  setStatusFib21(){
    this.currentHour
    if([21,22,23].includes(this.currentHour) && [21,22,23,24,25,26,27,28,29,30,31,32,33,55,56,57,58,59].includes(this.currentMinutes)){
      this.fib21UsedForHours = true;
      this.fib21UsedForMinutes = false;
      this.fib21UsedForBoth = false;
    } else if ( [21,22,23].includes(this.currentHour) && ![21,22,23,24,25,26,27,28,29,30,31,32,33,55,56,57,58,59].includes(this.currentMinutes)){
      this.fib21UsedForHours = true;
      this.fib21UsedForMinutes = false;
      this.fib21UsedForBoth = false;
    }else if ( ![21,22,23].includes(this.currentHour) && [21,22,23,24,25,26,27,28,29,30,31,32,33,55,56,57,58,59].includes(this.currentMinutes)){
      this.fib21UsedForHours = false;
      this.fib21UsedForMinutes = true;
      this.fib21UsedForBoth = false;
    }else {
      this.fib21UsedForHours = false;
      this.fib21UsedForMinutes = false;
      this.fib21UsedForBoth = false;
    }
  }

  setStatusFib34(){
    this.currentHour
    if( [34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59].includes(this.currentMinutes)){
      this.fib34UsedForHours = false;
      this.fib34UsedForMinutes = true;
      this.fib34UsedForBoth = false;
    } else {
      this.fib34UsedForHours = false;
      this.fib34UsedForMinutes = false;
      this.fib34UsedForBoth = false;
    }
  }

  get fib1BackgroundColor(): string {
    if (this.fib1UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib1UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib1UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib12BackgroundColor(): string {
    if (this.fib12UsedForHours) {
      return this.colorWhenUsedForHours;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib2BackgroundColor(): string {
    if (this.fib2UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib2UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib2UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib3BackgroundColor(): string {
    if (this.fib3UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib3UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib3UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib5BackgroundColor(): string {
    if (this.fib5UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib5UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib5UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib8BackgroundColor(): string {
    if (this.fib8UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib8UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib8UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib13BackgroundColor(): string {
    if (this.fib13UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib13UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib13UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib21BackgroundColor(): string {
    if (this.fib21UsedForBoth) {
      return this.colorWhenUsedForHoursAndMinutes;
    } else if (this.fib21UsedForHours) {
      return this.colorWhenUsedForHours;
    } else if (this.fib21UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }

  get fib34BackgroundColor(): string {
    if (this.fib34UsedForMinutes) {
      return this.colorWhenUsedForMinutes;
    } else {
      return this.colorWhenNotUsed;
    }
  }
}

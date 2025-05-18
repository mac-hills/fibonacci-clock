// src/app/services/animation.service.ts
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly SPIN_SPEED_KEY = 'fibonacciClockSpinSpeed';
  private defaultSpinSpeed = 60; // Default 60 seconds for full rotation

  constructor(private localStorageService: LocalStorageService) { }

  getSpinSpeed(): number {
    return this.localStorageService.getItem<number>(this.SPIN_SPEED_KEY, this.defaultSpinSpeed);
  }

  setSpinSpeed(speed: number): void {
    this.localStorageService.setItem(this.SPIN_SPEED_KEY, speed);
    // Update CSS variable for immediate effect
    document.documentElement.style.setProperty('--spin-duration', `${speed}s`);
  }
}

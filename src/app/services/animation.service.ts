import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly SPIN_SPEED_KEY = 'spinSpeed';
  private readonly STRIPES_SPIN_SPEED_KEY = 'stripesSpinSpeed';

  constructor(private localStorageService: LocalStorageService) {}

  getSpinSpeed(): number {
    return this.localStorageService.getItem<number>(this.SPIN_SPEED_KEY, 60);
  }

  setSpinSpeed(seconds: number): void {
    this.localStorageService.setItem(this.SPIN_SPEED_KEY, seconds);
    document.documentElement.style.setProperty('--spin-duration', `${seconds}s`);
  }

  getStripesSpinSpeed(): number {
    return this.localStorageService.getItem<number>(this.STRIPES_SPIN_SPEED_KEY, 60);
  }

  setStripesSpinSpeed(seconds: number): void {
    this.localStorageService.setItem(this.STRIPES_SPIN_SPEED_KEY, seconds);
    document.documentElement.style.setProperty('--stripes-spin-duration', `${seconds}s`);
  }
}

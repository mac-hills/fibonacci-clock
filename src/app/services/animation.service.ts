import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly SPIN_SPEED_KEY = 'spinSpeed';
  private readonly STRIPES_SPIN_SPEED_KEY = 'stripesSpinSpeed';
  private defaultSpinSpeed = 60;
  private defaultStripesSpinSpeed = 60;

  private spinSpeedSubject = new BehaviorSubject<number>(this.defaultSpinSpeed);
  public spinSpeed$: Observable<number> = this.spinSpeedSubject.asObservable();

  private stripesSpinSpeedSubject = new BehaviorSubject<number>(this.defaultStripesSpinSpeed);
  public stripesSpinSpeed$: Observable<number> = this.stripesSpinSpeedSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService
  ) {
    const speed = this.getSpinSpeed();
    const stripesSpeed = this.getStripesSpinSpeed();

    // Set initial CSS variables and subjects
    document.documentElement.style.setProperty('--spin-duration', `${speed}s`);
    document.documentElement.style.setProperty('--stripes-spin-duration', `${stripesSpeed}s`);

    this.spinSpeedSubject.next(speed);
    this.stripesSpinSpeedSubject.next(stripesSpeed);
  }

  getSpinSpeed(): number {
    return this.localStorageService.getItem<number>(this.SPIN_SPEED_KEY, 60);
  }

  setSpinSpeed(seconds: number): void {
    this.localStorageService.setItem(this.SPIN_SPEED_KEY, seconds);
    document.documentElement.style.setProperty('--spin-duration', `${seconds}s`);
    this.spinSpeedSubject.next(seconds);
  }

  getStripesSpinSpeed(): number {
    return this.localStorageService.getItem<number>(this.STRIPES_SPIN_SPEED_KEY, 60);
  }

  setStripesSpinSpeed(seconds: number): void {
    this.localStorageService.setItem(this.STRIPES_SPIN_SPEED_KEY, seconds);
    document.documentElement.style.setProperty('--stripes-spin-duration', `${seconds}s`);
    this.stripesSpinSpeedSubject.next(seconds);
  }
}

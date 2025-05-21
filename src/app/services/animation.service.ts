import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly SPIN_SPEED_KEY = 'fibonacciClockSpinSpeed';
  private defaultSpinSpeed = 60;

  // Add BehaviorSubject
  private spinSpeedSubject = new BehaviorSubject<number>(this.defaultSpinSpeed);
  public spinSpeed$: Observable<number> = this.spinSpeedSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const speed = this.getSpinSpeed();
    this.spinSpeedSubject.next(speed);
  }

  getSpinSpeed(): number {
    return this.localStorageService.getItem<number>(this.SPIN_SPEED_KEY, this.defaultSpinSpeed);
  }

  setSpinSpeed(speed: number): void {
    this.localStorageService.setItem(this.SPIN_SPEED_KEY, speed);
    this.spinSpeedSubject.next(speed);
    document.documentElement.style.setProperty('--spin-duration', `${speed}s`);
  }
}

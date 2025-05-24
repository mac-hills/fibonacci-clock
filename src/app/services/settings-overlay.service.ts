import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsOverlayService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$: Observable<boolean> = this.visibilitySubject.asObservable();

  constructor() {}

  showSettings(): void {
    this.visibilitySubject.next(true);
  }

  hideSettings(): void {
    this.visibilitySubject.next(false);
  }

  toggleSettings(): void {
    this.visibilitySubject.next(!this.visibilitySubject.value);
  }
}

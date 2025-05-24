import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsOverlayService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  public visibility$ = this.visibilitySubject.asObservable();

  showSettings() {
    this.visibilitySubject.next(true);
  }

  hideSettings() {
    this.visibilitySubject.next(false);
  }
}

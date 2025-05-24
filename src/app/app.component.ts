import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from './services/color.service';
import { interval } from 'rxjs';
import {SettingsOverlayService} from "./services/settings-overlay.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  settingsVisible = false;
  constructor(
    private settingsOverlayService: SettingsOverlayService,
    private colorService: ColorService,
    private renderer: Renderer2,
    private el: ElementRef){
    this.settingsOverlayService.visibility$.subscribe(visible => {
      this.settingsVisible = visible;
    });
    }
    currentHour!: number;
  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.setBodyBackgroundColor();
    });
  }



  setBodyBackgroundColor() {
    const body = this.el.nativeElement.ownerDocument.body;
    if (body) {
      const backgroundColor = this.colorService.getNextColorForBackground();
      this.renderer.setStyle(body, 'background-color', backgroundColor);
      const now = new Date();
    this.currentHour = now.getHours() ;
      console.log("color: " + backgroundColor + " - Hour: " + this.currentHour);
    }
  }
}

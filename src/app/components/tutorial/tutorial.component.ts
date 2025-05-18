import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {clockColors} from 'src/app/resources/color-resources/clockColors';
import {ColorPickerService} from 'ngx-color-picker';
import {ColorService} from 'src/app/services/color.service';
import {AnimationService} from 'src/app/services/animation.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  spinSpeed: number = 60;

  launchColorPicker(colorKey: string): void {
    const inputElement = document.createElement('input');
    inputElement.type = 'color';
    inputElement.value = this.colorService.getClockColors()[colorKey];

    inputElement.addEventListener('input', (event) => {
      const colorSelected = (event.target as HTMLInputElement).value;
      this.colorService.getClockColors()[colorKey] = colorSelected;
    });

    inputElement.click();
  }

  ngOnInit() {
    // Load saved spin speed
    this.spinSpeed = this.animationService.getSpinSpeed();
  }

  clockColors = clockColors;

  updateSpinSpeed(): void {
    this.animationService.setSpinSpeed(this.spinSpeed);
  }

  constructor(private colorService: ColorService, private colorPickerService: ColorPickerService, private router: Router, private animationService: AnimationService) {
  }

  backToClock() {
    this.router.navigate(['/clock']);
  }
}

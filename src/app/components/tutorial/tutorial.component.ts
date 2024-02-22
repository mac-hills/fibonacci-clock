import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { clockColors } from 'src/app/resources/color-resources/clockColors';
import { ColorPickerService } from 'ngx-color-picker';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent {

  
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

  clockColors = clockColors;

  constructor(private colorService: ColorService, private colorPickerService: ColorPickerService, private router: Router) { }

  backToClock() {
    this.router.navigate(['/clock']);
  }
}

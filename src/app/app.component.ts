import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ColorService } from './services/color.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router, 
    private colorService: ColorService,  
    private renderer: Renderer2,
    private el: ElementRef){
    }
    currentHour!: number;
  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.setBodyBackgroundColor();
    });
  }
    
  
  onClockContainerClick() {
    this.router.navigate(['/tutorial']);
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

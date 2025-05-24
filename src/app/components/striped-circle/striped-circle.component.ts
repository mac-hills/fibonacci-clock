import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-striped-circle',
  templateUrl: './striped-circle.component.html',
  styleUrls: ['./striped-circle.component.css']
})
export class StripedCircleComponent implements OnInit, OnChanges {
  @Input() numStripes: number = 34; // Number of stripes (default: 34)
  @Input() circleRadius: number = 50; // Circle radius in percentage (default: 50%)
  @Input() stripeColor: string = 'white'; // Stripe color (default: white)
  @Input() stripeLength: number = 0.99; // Relative stripe outer length (default: 0.99)
  @Input() innerLength: number = 0.85; // Relative stripe inner length (default: 0.85)
  @Input() strokeWidth: number = 1.0; // Stripe thickness (default: 1.0)
  @Input() showShadow: boolean = false;

  stripes: { x1: number; y1: number; x2: number; y2: number }[] = [];

  ngOnInit(): void {
    this.calculateStripes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate whenever any input property changes that affects the stripes
    if (changes['numStripes'] || changes['stripeLength'] || changes['innerLength'] ||
      changes['circleRadius'] || changes['strokeWidth']) {
      this.calculateStripes();
    }
  }

  calculateStripes(): void {
    const radius = this.circleRadius; // Outer radius of the circle
    const stripeLength = radius * this.stripeLength; // Stripes outer length
    const innerLength = radius * this.innerLength; // Stripes inner length

    this.stripes = [];
    const angleStep = (2 * Math.PI) / this.numStripes;

    for (let i = 0; i < this.numStripes; i++) {
      const angle = i * angleStep;
      const x1 = 50 + stripeLength * Math.cos(angle); // Outer edge X
      const y1 = 50 + stripeLength * Math.sin(angle); // Outer edge Y
      const x2 = 50 + innerLength * Math.cos(angle); // Inner edge X
      const y2 = 50 + innerLength * Math.sin(angle); // Inner edge Y

      this.stripes.push({ x1, y1, x2, y2 });
    }
  }
}

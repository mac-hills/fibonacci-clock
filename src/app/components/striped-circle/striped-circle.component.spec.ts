import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripedCircleComponent } from './striped-circle.component';

describe('StripedCircleComponent', () => {
  let component: StripedCircleComponent;
  let fixture: ComponentFixture<StripedCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripedCircleComponent]
    });
    fixture = TestBed.createComponent(StripedCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

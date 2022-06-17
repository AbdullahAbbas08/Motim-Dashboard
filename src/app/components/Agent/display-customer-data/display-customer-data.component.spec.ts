import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustomerDataComponent } from './display-customer-data.component';

describe('DisplayCustomerDataComponent', () => {
  let component: DisplayCustomerDataComponent;
  let fixture: ComponentFixture<DisplayCustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCustomerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

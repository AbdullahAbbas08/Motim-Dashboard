import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealWithCustomerComponent } from './deal-with-customer.component';

describe('DealWithCustomerComponent', () => {
  let component: DealWithCustomerComponent;
  let fixture: ComponentFixture<DealWithCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealWithCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealWithCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

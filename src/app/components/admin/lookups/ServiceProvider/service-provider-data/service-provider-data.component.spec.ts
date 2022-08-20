import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDataComponent } from './service-provider-data.component';

describe('ServiceProviderDataComponent', () => {
  let component: ServiceProviderDataComponent;
  let fixture: ComponentFixture<ServiceProviderDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

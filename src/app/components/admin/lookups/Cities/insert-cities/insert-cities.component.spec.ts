import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCitiesComponent } from './insert-cities.component';

describe('InsertCitiesComponent', () => {
  let component: InsertCitiesComponent;
  let fixture: ComponentFixture<InsertCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

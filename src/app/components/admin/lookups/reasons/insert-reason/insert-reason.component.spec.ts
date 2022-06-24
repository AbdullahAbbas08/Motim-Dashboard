import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertReasonComponent } from './insert-reason.component';

describe('InsertReasonComponent', () => {
  let component: InsertReasonComponent;
  let fixture: ComponentFixture<InsertReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDepartmentComponent } from './insert-department.component';

describe('InsertDepartmentComponent', () => {
  let component: InsertDepartmentComponent;
  let fixture: ComponentFixture<InsertDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

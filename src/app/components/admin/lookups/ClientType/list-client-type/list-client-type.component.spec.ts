import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientTypeComponent } from './list-client-type.component';

describe('ListClientTypeComponent', () => {
  let component: ListClientTypeComponent;
  let fixture: ComponentFixture<ListClientTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

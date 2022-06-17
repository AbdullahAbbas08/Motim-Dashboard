import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGovernorateComponent } from './list-governorate.component';

describe('ListGovernorateComponent', () => {
  let component: ListGovernorateComponent;
  let fixture: ComponentFixture<ListGovernorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGovernorateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

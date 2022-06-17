import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCallDetailsComponent } from './client-call-details.component';

describe('ClientCallDetailsComponent', () => {
  let component: ClientCallDetailsComponent;
  let fixture: ComponentFixture<ClientCallDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCallDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCallDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

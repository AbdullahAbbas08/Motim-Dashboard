import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAgentComponent } from './client-agent.component';

describe('ClientAgentComponent', () => {
  let component: ClientAgentComponent;
  let fixture: ComponentFixture<ClientAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAgentComponent } from './statistics-agent.component';

describe('StatisticsAgentComponent', () => {
  let component: StatisticsAgentComponent;
  let fixture: ComponentFixture<StatisticsAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

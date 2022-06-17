import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceMarketComponent } from './source-market.component';

describe('SourceMarketComponent', () => {
  let component: SourceMarketComponent;
  let fixture: ComponentFixture<SourceMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

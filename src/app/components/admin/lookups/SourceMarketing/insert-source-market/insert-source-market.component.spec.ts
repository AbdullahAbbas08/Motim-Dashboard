import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSourceMarketComponent } from './insert-source-market.component';

describe('InsertSourceMarketComponent', () => {
  let component: InsertSourceMarketComponent;
  let fixture: ComponentFixture<InsertSourceMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertSourceMarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertSourceMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

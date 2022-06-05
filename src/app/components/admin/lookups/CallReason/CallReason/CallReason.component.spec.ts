/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CallReasonComponent } from './CallReason.component';

describe('CallReasonComponent', () => {
  let component: CallReasonComponent;
  let fixture: ComponentFixture<CallReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

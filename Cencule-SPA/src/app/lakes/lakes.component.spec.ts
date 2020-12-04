/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LakesComponent } from './lakes.component';

describe('LakesComponent', () => {
  let component: LakesComponent;
  let fixture: ComponentFixture<LakesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LakesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

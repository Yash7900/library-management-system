/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FinesListComponent } from './finesList.component';

describe('FinesListComponent', () => {
  let component: FinesListComponent;
  let fixture: ComponentFixture<FinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

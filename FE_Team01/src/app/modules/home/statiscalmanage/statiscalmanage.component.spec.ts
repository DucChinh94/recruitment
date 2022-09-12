import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiscalmanageComponent } from './statiscalmanage.component';

describe('StatiscalmanageComponent', () => {
  let component: StatiscalmanageComponent;
  let fixture: ComponentFixture<StatiscalmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatiscalmanageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatiscalmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

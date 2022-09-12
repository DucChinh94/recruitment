import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranstolinkComponent } from './transtolink.component';

describe('TranstolinkComponent', () => {
  let component: TranstolinkComponent;
  let fixture: ComponentFixture<TranstolinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranstolinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranstolinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

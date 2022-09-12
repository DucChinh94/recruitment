import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendotpComponent } from './sendotp.component';

describe('SendotpComponent', () => {
  let component: SendotpComponent;
  let fixture: ComponentFixture<SendotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendotpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

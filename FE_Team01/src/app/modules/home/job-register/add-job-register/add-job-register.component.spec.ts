import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobRegisterComponent } from './add-job-register.component';

describe('AddJobRegisterComponent', () => {
  let component: AddJobRegisterComponent;
  let fixture: ComponentFixture<AddJobRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRegisterDetailsComponent } from './job-register-details.component';

describe('JobRegisterDetailsComponent', () => {
  let component: JobRegisterDetailsComponent;
  let fixture: ComponentFixture<JobRegisterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobRegisterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

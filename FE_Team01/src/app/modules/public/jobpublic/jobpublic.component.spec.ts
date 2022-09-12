import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpublicComponent } from './jobpublic.component';

describe('JobpublicComponent', () => {
  let component: JobpublicComponent;
  let fixture: ComponentFixture<JobpublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobpublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletejobEditerComponent } from './deletejob-editer.component';

describe('DeletejobEditerComponent', () => {
  let component: DeletejobEditerComponent;
  let fixture: ComponentFixture<DeletejobEditerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletejobEditerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletejobEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

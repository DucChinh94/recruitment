import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditjobeditorComponent } from './editjobeditor.component';

describe('EditjobeditorComponent', () => {
  let component: EditjobeditorComponent;
  let fixture: ComponentFixture<EditjobeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditjobeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditjobeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

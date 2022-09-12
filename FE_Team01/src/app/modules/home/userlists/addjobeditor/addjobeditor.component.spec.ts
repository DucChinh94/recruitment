import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobeditorComponent } from './addjobeditor.component';

describe('AddjobeditorComponent', () => {
  let component: AddjobeditorComponent;
  let fixture: ComponentFixture<AddjobeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddjobeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddjobeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

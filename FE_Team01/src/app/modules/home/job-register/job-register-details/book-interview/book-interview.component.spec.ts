import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInterviewComponent } from './book-interview.component';

describe('BookInterviewComponent', () => {
  let component: BookInterviewComponent;
  let fixture: ComponentFixture<BookInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdetailsjobComponent } from './showdetailsjob.component';

describe('ShowdetailsjobComponent', () => {
  let component: ShowdetailsjobComponent;
  let fixture: ComponentFixture<ShowdetailsjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowdetailsjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowdetailsjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

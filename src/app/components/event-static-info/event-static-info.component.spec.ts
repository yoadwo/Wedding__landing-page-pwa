import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStaticInfoComponent } from './event-static-info.component';

describe('EventStaticInfoComponent', () => {
  let component: EventStaticInfoComponent;
  let fixture: ComponentFixture<EventStaticInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStaticInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStaticInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

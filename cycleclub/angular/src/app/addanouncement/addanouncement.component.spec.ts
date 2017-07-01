import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddanouncementComponent } from './addanouncement.component';

describe('AddanouncementComponent', () => {
  let component: AddanouncementComponent;
  let fixture: ComponentFixture<AddanouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddanouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddanouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

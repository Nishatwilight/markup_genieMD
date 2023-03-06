import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotesComponent } from './alert-notes.component';

describe('AlertNotesComponent', () => {
  let component: AlertNotesComponent;
  let fixture: ComponentFixture<AlertNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

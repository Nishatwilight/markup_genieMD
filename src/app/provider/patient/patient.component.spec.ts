import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PatientComponent } from './patient.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientComponent ],
      providers: [HttpClient, HttpHandler ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

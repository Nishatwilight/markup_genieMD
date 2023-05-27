import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VitalsComponent } from './vitals.component';
import { NbCardModule } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
describe('VitalsComponent', () => {
  let component: VitalsComponent;
  let fixture: ComponentFixture<VitalsComponent>;
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '123eFd4545x%f54655eG556'
      }
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsComponent ],
      imports:[HttpClientTestingModule, NbCardModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        Router
      ]    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

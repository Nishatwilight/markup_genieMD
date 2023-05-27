import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterComponent } from './encounter.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('EncounterComponent', () => {
  let component: EncounterComponent;
  let fixture: ComponentFixture<EncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncounterComponent ],
      providers: [HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Hey There', () => {
    console.log('sdaf');
    expect(component).toBeTruthy();
  });
});

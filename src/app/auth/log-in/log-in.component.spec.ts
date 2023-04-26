import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NbCardModule, NbFormFieldModule, NbStatusService } from '@nebular/theme';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let router: MockRouter;
  let authService: jasmine.SpyObj<AuthService>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInComponent ],
      imports: [ HttpClientTestingModule, NbCardModule,  NbFormFieldModule, FormsModule,ReactiveFormsModule,  ],
      providers: [
        { NbStatusService,}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      
    })

    .compileComponents();
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formControl = new FormControl('initial value');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /auth/login/forms', () => {
    spyOn(router, 'navigate');
    component.formArray();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login/forms']);
  });
  it('should set loading to true on click', () => {
    component.clickFunction();
    expect(component.loading).toBeTrue();
  });
  it('should call AuthService.login with the correct payload', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.registrationForm.setValue({ userName: email, password });
    component.clickFunction();
    expect(authService.login).toHaveBeenCalledWith({ email, password });
  });
  // it('should navigate to the correct URL after successful login', () => {
  //   const userID = '123';
  //   // authService.login.and.returnValue({ userID });
  //   component.clickFunction();
  //   expect(router.navigate).toHaveBeenCalledWith([`/provider/${userID}/dashboard/patient`]);
  // });

  
  it('should make a POST request to the server', () => {
    const payload = {
      email: 'test@example.com',
      password: 'password123',
    }; 
    authService.login(payload).subscribe(response => {
      expect(response).toEqual(payload);
    });})
});

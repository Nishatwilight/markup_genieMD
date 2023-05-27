<<<<<<< HEAD
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbCardModule, NbFormFieldModule, NbSpinnerModule, NbStatusService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';




=======
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NbCardModule, NbFormFieldModule, NbStatusService } from '@nebular/theme';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormControlName, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
>>>>>>> 4969f14716dc58af50026d0ffd320b2339962c31

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
<<<<<<< HEAD
  let authService: AuthService;
  let router: Router;
=======
  let router: MockRouter;
  let authService: jasmine.SpyObj<AuthService>;


>>>>>>> 4969f14716dc58af50026d0ffd320b2339962c31

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInComponent ],
<<<<<<< HEAD
      imports:[HttpClientTestingModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, FormsModule, ReactiveFormsModule],
      providers: [NbStatusService, AuthService, Router]



=======
      imports: [ HttpClientTestingModule, NbCardModule,  NbFormFieldModule, FormsModule,ReactiveFormsModule,  ],
      providers: [
        { NbStatusService,}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      
>>>>>>> 4969f14716dc58af50026d0ffd320b2339962c31
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
<<<<<<< HEAD

  it('should initialize registrationForm with userName and password fields', () => {
    // Call the ngOnInit method
    component.ngOnInit();

    // Assert the registrationForm is an instance of FormGroup
    expect(component.registrationForm instanceof FormGroup).toBe(true);

    // Assert the registrationForm has a 'userName' FormControl
    expect(component.registrationForm.get('userName') instanceof FormControl).toBe(true);

    // Assert the registrationForm has a 'password' FormControl
    expect(component.registrationForm.get('password') instanceof FormControl).toBe(true);
  });

  it('should set Validators.required and Validators.minLength(4) for userName field', () => {
    // Call the ngOnInit method
    component.ngOnInit();

    // Get the userName FormControl
    const userNameControl = component.registrationForm.get('userName');

    // Assert Validators.required is set for userName field
    expect(userNameControl.validator).toContain(Validators.required);

    // Assert Validators.minLength(4) is set for userName field
    expect(userNameControl.validator).toContain(Validators.minLength(4));
  });

  it('should set Validators.required and Validators.minLength(8) for password field', () => {
    // Call the ngOnInit method
    component.ngOnInit();

    // Get the password FormControl
    const passwordControl = component.registrationForm.get('password');

    // Assert Validators.required is set for password field
    expect(passwordControl.validator).toContain(Validators.required);

    // Assert Validators.minLength(8) is set for password field
    expect(passwordControl.validator).toContain(Validators.minLength(8));
  });

  it('should call authService.login with correct payload and navigate to dashboard on successful login', fakeAsync(() => {
    // Spy on authService.login and mock the return value
    spyOn(authService, 'login').and.returnValue(of({ userID: '123' }));

    // Spy on router.navigate method
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    // Set form values
    component.registrationForm.patchValue({ userName: 'testuser', password: 'testpassword' });

    // Call the clickFunction method
    component.clickFunction();

    // Expect authService.login to be called with correct payload
    expect(authService.login).toHaveBeenCalledWith({ email: 'testuser', password: 'testpassword' });

    // Expect router.navigate to have been called with correct route
    expect(router.navigate).toHaveBeenCalledWith(['/provider/123/dashboard/patient']);

    // Use fakeAsync and tick to simulate passage of time for asynchronous operations
    tick();

    // Expect loading to be false after successful login
    expect(component.loading).toBe(false);
  }));

  it('should store user data in localStorage and sessionStorage on successful login', fakeAsync(() => {
    // Spy on authService.login and mock the return value
    spyOn(authService, 'login').and.returnValue(of({ userID: '456' }));

    // Set form values
    component.registrationForm.patchValue({ userName: 'testuser', password: 'testpassword' });

    // Call the clickFunction method
    component.clickFunction();

    // Expect localStorage and sessionStorage to have been called with correct data
    expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify({ email: 'testuser', password: 'testpassword' }));
    expect(sessionStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify({ email: 'testuser', password: 'testpassword' }));

    // Use fakeAsync and tick to simulate passage of time for asynchronous operations
    tick();

    // Expect loading to be false after successful login
    expect(component.loading).toBe(false);
  }));

  it('should handle error on login failure', fakeAsync(() => {
    // Spy on authService.login and mock the return value to throw an error
    spyOn(authService, 'login').and.returnValue(throwError('Error'));

    // Set form values
    component.registrationForm.patchValue({ userName: 'testuser', password: 'testpassword' });

    // Call the clickFunction method
    component.clickFunction();

    // Use fakeAsync and tick to simulate passage of time for asynchronous operations
    tick();

    // Expect loading to be false after login failure
    expect(component.loading).toBe(false);
    // Expect error handling logic to be triggered, e.g. showing an error message or redirecting to an error page
    // Add your specific error handling expectations here based
}));
})
=======
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
>>>>>>> 4969f14716dc58af50026d0ffd320b2339962c31

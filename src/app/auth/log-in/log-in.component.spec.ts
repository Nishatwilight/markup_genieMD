import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbCardModule, NbFormFieldModule, NbSpinnerModule, NbStatusService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';





describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInComponent ],
      imports:[HttpClientTestingModule, NbCardModule, NbFormFieldModule, NbSpinnerModule, FormsModule, ReactiveFormsModule],
      providers: [NbStatusService, AuthService, Router]



    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

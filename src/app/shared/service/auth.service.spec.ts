import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { mapTo, timer } from 'rxjs';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject HttpClient', () => {
    expect(service instanceof AuthService).toBeTruthy();
    expect(service.http instanceof HttpClient).toBeTruthy();
  });
  
  it('should send a POST request to the login endpoint', () => {
    const payload = { username: 'test', password: '1234' };
    const mockResponse = { token: 'abc123' };

    service.login(payload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('Email/SignIn/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(mockResponse);
  });
  it('should send an HTTP GET request', () => {
    const id = 123;
    const expectedUrl = `Profile/${id}`;
    const expectedResponse = { names: 'John Doe' };

    service.getProfiles(id).subscribe(response => {
      console.log('response, response', response);
      
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });

  it('should set the profile property', () => {
    const id = 123;
    const expectedUrl = `Profile/${id}`;
    const expectedResponse = { name: 'John Doe' };

    service.getProfiles(id).subscribe(() => {
      expect(service.profile).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    req.flush(expectedResponse);
  });
  it('should return search results', () => {
    const mockPayload = { searchQuery: 'John' };
    const mockResponse = [{ name: 'John Doe' }, { name: 'John Smith' }];

    service.search(mockPayload).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`Clinics/SearchPatients2`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });



  // it('should emit a value after a delay', fakeAsync(() => {
  //   let value: string | undefined;
  
  //   // Create an observable that emits a value after a delay
  //   const obs = timer(1000).pipe(mapTo('Hello'));
  //   console.log('Create an observable that emits a value after a delay', obs);
    
  
  //   // Subscribe to the observable and store the emitted value
  //   obs.subscribe((v) => (value = v));
  //   console.log('Subscribe to the observable and store the emitted value', value);
    
  
  //   // Advance the clock by the delay using tick()
  //   tick(1000);
  
  //   // Verify that the emitted value is correct
  //   expect(value).toEqual('Hello');
  
  //   // Manually trigger the completion of the observable using flush()
  // }));
});


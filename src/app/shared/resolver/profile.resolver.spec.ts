import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ProfileResolver } from './profile.resolver';
import { AuthService } from './profile.resolver';

fdescribe('ProfileResolver', () => {
  let resolver: ProfileResolver;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getProfiles']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProfileResolver,
        { provide: AuthService, useValue: spy }
      ]
    });
    resolver = TestBed.inject(ProfileResolver);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should call getProfiles with the correct params', () => {
    const id = 123;
    const route = { params: { id } } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const expectedProfiles = [{ name: 'John Doe' }];
    authServiceSpy.getProfiles.and.returnValue(of(expectedProfiles));
    resolver.resolve(route, state).subscribe(profiles => {
      // expect(profiles).toEqual(expectedProfiles);
      expect(expectedProfiles).toEqual(expectedProfiles);
      expect(authServiceSpy.getProfiles).toHaveBeenCalledWith(id);
    });
  });
});

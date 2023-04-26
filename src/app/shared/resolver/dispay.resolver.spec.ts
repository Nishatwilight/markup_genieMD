import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { DispayResolver } from './dispay.resolver';
import { CareManagerService } from '../service/care-manager.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('DispayResolver', () => {
  let resolver: DispayResolver;
  let careService: jasmine.SpyObj<CareManagerService>;

  beforeEach(() => {
    const careServiceSpy = jasmine.createSpyObj('CareManagerService', ['displayProfile']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [CareManagerService, DispayResolver,
        { provide: CareManagerService, useValue: careServiceSpy }]
    });
    resolver = TestBed.inject(DispayResolver);
    careService = TestBed.inject(CareManagerService) as jasmine.SpyObj<CareManagerService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should inject the CareManagerService', () => {
    expect(resolver.careService).toEqual(careService);
  });

  it('should resolve with true', (done) => {
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;
    careService.displayProfile.and.returnValue(of(true));
    resolver.resolve(mockRoute, mockState).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });
  it('should log the route', (done) => {
    const mockRoute = { data: { userId: 123 } } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;
    careService.displayProfile.and.returnValue(of(true));
    spyOn(console, 'log');
    resolver.resolve(mockRoute, mockState).subscribe(() => {
      expect(console.log).toHaveBeenCalledWith('*))))((((*', mockRoute);
      done();
    });
  });
});

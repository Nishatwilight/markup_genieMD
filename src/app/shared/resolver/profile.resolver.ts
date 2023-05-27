import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<boolean> {
  constructor(private authService: AuthService,
   ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getProfiles(route.params['id'])
  }
}
export { AuthService };


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
    // console.log('resolvezzzzzzzzzzzzzzz', route);
    // localStorage.getItem('providerLoginKey')
    // localStorage.setItem('providerLoginKey', 'und')
    // localStorage.clear()
    // localStorage.removeItem('providerLoginKey')
    return this.authService.getProfiles(route.params['id'])
  }

}

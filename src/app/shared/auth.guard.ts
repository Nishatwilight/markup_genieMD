import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardService } from './service/guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private guardService: GuardService,
    private routing: Router){

  }
  canActivate () {
    if(sessionStorage.getItem('userData')){
      return true
    } else {
      this.routing.navigate(['auth', 'login'])
      return false;
    } 

  }
  
}

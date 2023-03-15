import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CareManagerService } from '../service/care-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DispayResolver implements Resolve<boolean> {
  constructor( private careService: CareManagerService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    console.log('*))))((((*', route); 
    return this.careService.displayProfile(route)
  }
 
}

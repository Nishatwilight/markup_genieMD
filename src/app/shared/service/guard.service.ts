import { Injectable } from '@angular/core';
import { InterceptorInterceptor } from '../interceptor/interceptor.interceptor';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService {
  // userDatas: string
constructor(){
  
}
// clearAuthToken(){
//  sessionStorage.removeItem('userData');
// }
  // autoLogin(){
  //  !!sessionStorage.getItem('userData')    
  // }
}

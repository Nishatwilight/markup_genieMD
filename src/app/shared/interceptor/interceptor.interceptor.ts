import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("(request interceptor)", request);
    // request.url = "../../Email/SignIn/"
    // let path = 'https://dev.geniemd.net/ivisit.ComV5.00/resources'
    let path = '/ivisit.ComV5.00/resources'
    path += `/${request.url}`;
    console.log('the (interceptor) is triggred', path);
    
   request = request.clone({
      url: path            
    });
    console.log("request (interceptor)",request);

    return next.handle(request).pipe(
      tap(
        (        result: any) => {
          console.log("success (interceptor)", result);    
        },
        (        error: any) => {
          console.log("error (interceptor)", error)
        }
      )
    )
  }
}


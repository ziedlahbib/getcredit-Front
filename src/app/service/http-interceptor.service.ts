import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token=localStorage.getItem('autorisation');
      console.log('intercep',token)
      const authReq = req.clone({
          headers: new HttpHeaders({

              'Authorization': `Bearer  ${token}`
          })

      });
      return next.handle(authReq);

  }
}

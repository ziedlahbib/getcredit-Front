import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //basicauthurl="api/auth/signin";
  basicauthurl="http://localhost:8081/auth/signin";
  
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username?: string;
  public password?: string;
  constructor(private http: HttpClient) { }
  authenticationService(data:any) :Observable<any> {
    return this.http.post<any>(`${this.basicauthurl}`,data);
  }

  registerSuccessfulLogin(data:any) {
    localStorage.clear();
    localStorage.setItem('autorisation',data.accessToken);
    console.log(data.accessToken);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = "";
    this.password = "";
  }

}

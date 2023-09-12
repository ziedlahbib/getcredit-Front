import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';
import { Magasin } from '../model/magasin';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  getbyusersurl="/api/user/get-users";
  getbyuserbuusernamesurl="/api/user/get-userbyusername";
  getbyuserbyemailsurl="/api/user/get-userbyemail";
  getbyuserbyentrpreneursurl="/api/user/get-userbyentrepreneur";
  getbyuserbyagentsurl="/api/user/get-userbyagent";
  getbyuserbyIdsurl="/api/user/get-user";
  adduserUrl="/api/auth/signup";
  ajoutclienturl="/api/user/add-client";
  modifierclientUrl="/api/user/update-client";
  modifieruserUrl="/api/user/update-utilisateur";
  modifierpwuserUrl="/api/user/update-password";
  deleteusersUrl="/api/user/delete-user";
  getbyuserbymagsinsurl="/api/user/get-userbymagasin";
  forgotpassworduril="/api/forgot";
  resetpassworduril="/api/reset";

  constructor(private http : HttpClient) { }

  forgotPassword(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.put(`${this.forgotpassworduril}`, null, { params, responseType: 'text' })
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }
  
  resettpassword(us: string, rt: string): Observable<string> {
    return this.http.put(`${this.resetpassworduril}/${rt}`, us, { responseType: 'text' })
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }
  
  getusers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyusersurl}`);

  }
  getuserByentrepreneur(iduser :Number): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyuserbyentrpreneursurl}/${iduser}`);

  }
  getuserBagent(iduser :Number): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyuserbyagentsurl}/${iduser}`);

  }
  getuserBymagasin(idmagsin :Number): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyuserbymagsinsurl}/${idmagsin}`);

  }
  getuserById(iduser :Number): Observable<User>{
    return this.http.get<User>(`${this.getbyuserbyIdsurl}/${iduser}`);

  }
  getuserByusername(username :string): Observable<User>{
    return this.http.get<User>(`${this.getbyuserbuusernamesurl}/${username}`);

  }
  getuserByemail(email :string): Observable<User>{
    return this.http.get<User>(`${this.getbyuserbyemailsurl}/${email}`);

  }
  ajoutuser(user :User): Observable<User>{
    return this.http.post<User>(`${this.adduserUrl}`,user);
  }
  ajoutclient(user :User): Observable<User>{
    return this.http.post<User>(`${this.ajoutclienturl}`,user);
  }
  updateClient(id:Number, client:User):Observable<User>{
    return this.http.put<User>(`${this.modifierclientUrl}/${id}`,client);
  }
  updateuser(id:Number, user:User):Observable<User>{
    return this.http.put<User>(`${this.modifieruserUrl}/${id}`,user);
  }
  updatepassword(iduser:Number,request:ChangePasswordRequest):Observable<HttpEvent<any>>{
    //return this.http.put<string>(`${this.modifierpwuserUrl}/${iduser}`,request);
    const req = new HttpRequest('PUT', `${this.modifierpwuserUrl}/${iduser}`, request, {
      reportProgress: true,
      responseType: 'text',
     
    },);
   
    return this.http.request(req);
  }
  deleteuser(id:number): any{
    return this.http.delete(`${this.deleteusersUrl}/${id}`);
  }
  affecteruserentrepreneur(ida:Number,ide :Number,user :User): Observable<User>{
    return this.http.put<User>("/api/user/affecter-utilisateur-entrepreneur/"+ida+"/"+ide,user);
  }
  affecteragentmagasin(ida:Number,idm:Number,user:User):Observable<User>{
    return this.http.put<User>("/api/user/affecter-utilisateur-magasin/"+ida+"/"+idm,user);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Magasin } from '../model/magasin';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  getbyusersurl="/api/user/get-users";
  getbyuserbyentrpreneursurl="/api/user/get-userbyentrepreneur";
  getbyuserbyagentsurl="/api/user/get-userbyagent";
  getbyuserbyIdsurl="/api/user/get-user";
  adduserUrl="/api/auth/signup";
  modifieruserUrl="/api/user/update-utilisateur";
  deleteusersUrl="/api/user/delete-user";
  getbyuserbymagsinsurl="/api/user/get-userbymagasin"

  constructor(private http : HttpClient) { }

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
  ajoutuser(user :User): Observable<User>{
    return this.http.post<User>(`${this.adduserUrl}`,user);
  }
  updateuser(id:Number, user:User):Observable<User>{
    return this.http.put<User>(`${this.modifieruserUrl}/${id}`,user);
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

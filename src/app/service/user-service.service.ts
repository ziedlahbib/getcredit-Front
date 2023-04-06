import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  getbyusersurl="/api/user/get-users";
  getbyuserbyIdsurl="/api/user/get-user";
  adduserUrl="/api/auth/signup";
  modifieruserUrl="/api/user/update-utilisateur";
  deleteusersUrl="/api/user/delete-user";
  constructor(private http : HttpClient) { }

  getusers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyusersurl}`);

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
}

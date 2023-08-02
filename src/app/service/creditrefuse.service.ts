import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Creditrefuse } from '../model/creditrefuse.model';

@Injectable({
  providedIn: 'root'
})
export class CreditrefuseService {
  getcreditssurl="/api/creditRef/get-Creditsref";
  getcreditbyIdsurl="/api/creditref/get-creditref";
  addcreditUrl="/api/creditRef/add-creditref";
  constructor(private http : HttpClient) { }
  
  getCredits(): Observable<Creditrefuse[]>{
    return this.http.get<Creditrefuse[]>(`${this.getcreditssurl}`);

  }

  getCreditById(ident :Number): Observable<Creditrefuse>{
    return this.http.get<Creditrefuse>(`${this.getcreditbyIdsurl}/${ident}`);

  }
  ajoutCredit(Credit :Creditrefuse): Observable<Creditrefuse>{
    return this.http.post<Creditrefuse>(`${this.addcreditUrl}`,Credit);
  }
  affectecreditclient(idcr:Number,idc :Number,Credit :Creditrefuse): Observable<Creditrefuse>{
    return this.http.put<Creditrefuse>("/api/credit/affecter-credit-client/"+idcr+"/"+idc,Credit);
  }
  affectecreditagent(idc:Number,ida :Number,Credit :Creditrefuse): Observable<Creditrefuse>{
    return this.http.put<Creditrefuse>("/api/credit/affecter-credit-agent/"+idc+"/"+ida,Credit);
  }
  affectecreditproduit(idc:Number,idp :Number,Credit :Creditrefuse): Observable<Creditrefuse>{
    return this.http.put<Creditrefuse>("/api/credit/affecter-credit-produit/"+idc+"/"+idp,Credit);
  }
}

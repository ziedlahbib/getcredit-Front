import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credit } from '../model/credit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditServiceService {

  getcreditssurl="/api/credit/get-credits";
  getcreditbyIdsurl="/api/credit/get-credit";
  addcreditUrl="/api/credit/add-credit";
  constructor(private http : HttpClient) { }

  getCredits(): Observable<Credit[]>{
    return this.http.get<Credit[]>(`${this.getcreditssurl}`);

  }

  getCreditById(ident :Number): Observable<Credit>{
    return this.http.get<Credit>(`${this.getcreditbyIdsurl}/${ident}`);

  }
  ajoutCredit(Credit :Credit): Observable<Credit>{
    return this.http.post<Credit>(`${this.addcreditUrl}`,Credit);
  }
  affectecreditclient(idcr:Number,idc :Number,Credit :Credit): Observable<Credit>{
    return this.http.put<Credit>("/api/credit/affecter-credit-client/"+idcr+"/"+idc,Credit);
  }
  affectecreditagent(idc:Number,ida :Number,Credit :Credit): Observable<Credit>{
    return this.http.put<Credit>("/api/credit/affecter-credit-agent/"+idc+"/"+ida,Credit);
  }
  affectecreditproduit(idc:Number,idp :Number,Credit :Credit): Observable<Credit>{
    return this.http.put<Credit>("/api/credit/affecter-credit-produit/"+idc+"/"+idp,Credit);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatitsiqteserviceService {

  crrefpoururl="api/statistic/get-creditref-pourcentage";
  crpoururl="api/statistic/get-credit-pourcentage";
  crpourparenturl="api/statistic/get-creditref-ent";
  crrefpourparenturl="api/statistic/get-creditref-ent"
  constructor(private http : HttpClient) { }

  getCreditsrefper(): Observable<Number>{
    return this.http.get<Number>(`${this.crrefpoururl}`);

  }
  getCreditsper(): Observable<Number>{
    return this.http.get<Number>(`${this.crpoururl}`);

  }
  getCreditsperparent(ident:Number): Observable<number>{
    return this.http.get<number>("api/statistic/get-creditref-ent/"+ident);

  }
  getCreditrefsperparent(ident:Number): Observable<number>{
    return this.http.get<number>("api/statistic/get-credit-ent/"+ident);

  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Magasin } from '../model/magasin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagasinServiceService {

  getmagasinssurl="/api/magasin/get-magasins";
  getmagasinsbyentrepreneursurl="/api/magasin/get-magasinsbyentrepreneur";
  getmagasinsbyentrepriseurl="/api/magasin/get-magasinsparentreprise";
  getmagasinbyIdsurl="/api/magasin/get-magasin";
  addmagsinUrl="/api/magasin/add-magasin";
  modifiermagasinUrl="/api/magasin/update-magasin";
  deletemagasinUrl="/api/magasin/delete-magasin";
  getmagasinbyproduiturl="/api/magasin/get-magasin-par-produit"
  constructor(private http : HttpClient) { }

  getMagasins(): Observable<Magasin[]>{
    return this.http.get<Magasin[]>(`${this.getmagasinssurl}`);

  }
  getmagasinbyentrepreneur(iduser:Number):Observable<Magasin[]>{
    return this.http.get<Magasin[]>(`${this.getmagasinsbyentrepreneursurl}/${iduser}`);
  }
  getmagasinsbyentreprise(identreprise :Number): Observable<Magasin[]>{
    return this.http.get<Magasin[]>(`${this.getmagasinsbyentrepriseurl}/${identreprise}`);

  }
  getMagasinById(ident :Number): Observable<Magasin>{
    return this.http.get<Magasin>(`${this.getmagasinbyIdsurl}/${ident}`);

  }
  getMagasinByproduit(idp :Number): Observable<Magasin>{
    return this.http.get<Magasin>(`${this.getmagasinbyproduiturl}/${idp}`);

  }
  ajoutMagasin(magasin :Magasin): Observable<Magasin>{
    return this.http.post<Magasin>(`${this.addmagsinUrl}`,magasin);
  }
  updateMagasin(id:Number, magasin:Magasin):Observable<Magasin>{
    return this.http.put<Magasin>(`${this.modifiermagasinUrl}/${id}`,magasin);
  }
  deleteMagasin(id:number): any{
    return this.http.delete(`${this.deletemagasinUrl}/${id}`);
  }
  affectemaghasinentreprise(idm:Number,ide :Number,magasin :Magasin): Observable<Magasin>{
    return this.http.put<Magasin>("/api/magasin/affecter-magasin-entreprise/"+idm+"/"+ide,magasin);
  }
}

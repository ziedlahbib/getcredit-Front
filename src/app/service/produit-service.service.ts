import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitServiceService {

  getProduitssurl="/api/produit/get-produits";
  getProduitbyIdsurl="/api/produit/get-produit";
  addmagsinUrl="/api/produit/add-produit";
  modifierProduitUrl="/api/produit/update-produit";
  deleteProduitUrl="/api/produit/delete-produit";
  constructor(private http : HttpClient) { }

  getProduits(): Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.getProduitssurl}`);

  }
  getProduitById(ident :Number): Observable<Produit>{
    return this.http.get<Produit>(`${this.getProduitbyIdsurl}/${ident}`);

  }
  ajoutProduit(Produit :Produit): Observable<Produit>{
    return this.http.post<Produit>(`${this.addmagsinUrl}`,Produit);
  }
  updateProduit(id:Number, Produit:Produit):Observable<Produit>{
    return this.http.put<Produit>(`${this.modifierProduitUrl}/${id}`,Produit);
  }
  deleteProduit(id:number): any{
    return this.http.delete(`${this.deleteProduitUrl}/${id}`);
  }
  affecterproduitmagasin(idm:Number,idp :Number,produit :Produit): Observable<Produit>{
    return this.http.put<Produit>("/api/produit/affecter-produit-magasin/"+idm+"/"+idp,produit);
  }
}

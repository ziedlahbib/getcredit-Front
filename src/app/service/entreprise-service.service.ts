import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from '../model/entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {

  getbyentreprisesurl="/api/entreprise/get-entreprises";
  getbyentreprisebyIdsurl="/api/entreprise/get-entreprsier";
  getbyentreprisebyentrepreneursurl="/api/entreprise/get-entreprisesparuser";
  getbyentreprisebyAgentsurl="/api/entreprise/get-entreprise-paruser";
  addentrepriseUrl="/api/entreprise/add-entreprise";
  modifierentrepriseUrl="/api/entreprise/update-entreprise";
  deleteentrepriseUrl="/api/entreprise/delete-entreprise";
  constructor(private http : HttpClient) { }

  getEntreprises(): Observable<Entreprise[]>{
    return this.http.get<Entreprise[]>(`${this.getbyentreprisesurl}`);

  }
  getEntrepriseById(ident :Number): Observable<Entreprise>{
    return this.http.get<Entreprise>(`${this.getbyentreprisebyIdsurl}/${ident}`);

  }
  getEntrepriseByentrepreneur(ident :Number): Observable<Entreprise[]>{
    return this.http.get<Entreprise[]>(`${this.getbyentreprisebyentrepreneursurl}/${ident}`);

  }
  getEntrepriseByAgent(iduser :Number): Observable<Entreprise>{
    return this.http.get<Entreprise>(`${this.getbyentreprisebyAgentsurl}/${iduser}`);

  }
  ajoutEntreprise(entreprise :Entreprise): Observable<Entreprise>{
    return this.http.post<Entreprise>(`${this.addentrepriseUrl}`,entreprise);
  }
  updateEntreprise(id:Number, entreprise:Entreprise):Observable<Entreprise>{
    return this.http.put<Entreprise>(`${this.modifierentrepriseUrl}/${id}`,entreprise);
  }
  deleteEntreprise(id:number): any{
    return this.http.delete(`${this.deleteentrepriseUrl}/${id}`);
  }
  affectentrepriseuser(idu:Number,ide :Number,entreprise :Entreprise): Observable<Entreprise>{
    return this.http.put<Entreprise>("/api/entreprise/affecter-utilisateur-entreprise/"+idu+"/"+ide,entreprise);
  }
}

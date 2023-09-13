// user.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nomSubject = new BehaviorSubject<String>('');
  nom$: Observable<String> = this.nomSubject.asObservable();
  private prenomSubject = new BehaviorSubject<String>('');
  prenom$: Observable<String> = this.prenomSubject.asObservable();
  constructor() {}

  setNom(nom: String): void {
    this.nomSubject.next(nom);
  }

  getNom(): String {
    return this.nomSubject.value;
  }
  setPrenom(nom: String): void {
    this.prenomSubject.next(nom);
  }

  getPrenom(): String {
    return this.prenomSubject.value;
  }
}

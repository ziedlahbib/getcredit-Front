import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Gestion des utilisateurs',
        items: [
            {
                label: 'Ajouter un utilisateur',
                routerLink: '/ajoutuser',
                visible:this.isEntrepreneur() || this.isAdmin()

            },
            {
                label: 'Afficher la liste des utilisateurs',
                routerLink: '/affichlistuser',

            },
            
        ]
    },
    {
        label: 'Gestion des Entreprises',
        items: [
            {
                label: 'Ajouter un entreprise',
                routerLink:'/ajoutEntreprise',
                visible:this.isEntrepreneur()

            },

            {
                label: 'Afficher la liste des entreprises',
                routerLink:'/affichlistEntreprise'

            },
            
        ],
        visible:this.isAdmin()||this.isEntrepreneur()
    },
    {
        label: 'Gestion des magasins',
        items: [
            {
                label: 'Ajouter un magasin',
                routerLink:'/ajoutMagasin',
                visible:this.isEntrepreneur()

            },
            {
                label: 'Afficher la liste des magasins',
                routerLink:'/affichlistMagasins'

            },
            
        ],
        visible:this.isAdmin()||this.isEntrepreneur()
    }, {
        label: 'Gestion des produits',
        items: [
            {
                label: 'Ajouter un produit',
                routerLink:'/ajoutProduit',
                visible:this.isEntrepreneur() || this.isAgent()

            },
            {
                label: 'Afficher la liste des produits',
                routerLink:'/affichlistProduits'

            },
            
        ]
    },{
        label: 'Gestion des crédits',
        items: [
            {
                label: 'Afficher la liste des crédits accéptés',
                routerLink:'/affichcredit',
                

            },{
                label: 'Afficher la liste des crédits refusés',
                routerLink:'/affichcreditref',
                

            },
            
        ],
        visible:this.isAdmin()
    },{
        label: 'statistique',
        items: [
            {
                label: 'Afficher la statistique',
                routerLink:'/affichstatitistique',
                

            },
            
        ],
        visible:this.isAdmin()
    },
  ]
}
isAdmin():boolean{
    let role=localStorage.getItem('role'|| '');
    return role=="ROLE_ADMIN"
}
isEntrepreneur():boolean{
    let role=localStorage.getItem('role'|| '');
    return role=="ROLE_ENTREPRENEUR"
}
isAgent():boolean{
    let role=localStorage.getItem('role'|| '');
    return role=="ROLE_AGENT"
}
}



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
                label: 'ajouter',
                routerLink: '/ajoutuser',
                visible:this.isEntrepreneur() || this.isAdmin()

            },
            {
                label: 'afficher',
                routerLink: '/affichlistuser',

            },
            
        ]
    },
    {
        label: 'Gestion des Entreprises',
        items: [
            {
                label: 'ajouter',
                routerLink:'/ajoutEntreprise',
                visible:this.isEntrepreneur()

            },

            {
                label: 'afficher',
                routerLink:'/affichlistEntreprise'

            },
            
        ],
        visible:this.isAdmin()||this.isEntrepreneur()
    },
    {
        label: 'Gestion des magasins',
        items: [
            {
                label: 'ajouter',
                routerLink:'/ajoutMagasin',
                visible:this.isEntrepreneur()

            },
            {
                label: 'afficher',
                routerLink:'/affichlistMagasins'

            },
            
        ],
        visible:this.isAdmin()||this.isEntrepreneur()
    }, {
        label: 'Gestion des produits',
        items: [
            {
                label: 'ajouter',
                routerLink:'/ajoutProduit',
                visible:this.isEntrepreneur() || this.isAgent()

            },
            {
                label: 'afficher',
                routerLink:'/affichlistProduits'

            },
            
        ]
    },{
        label: 'Gestion des crédits',
        items: [
            {
                label: 'afficher',
                routerLink:'/affichcredit',
                

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



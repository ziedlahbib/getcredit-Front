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

            },
            {
                label: 'modifier',

            },
            {
                label: 'afficher',
                routerLink:'/affichlistEntreprise'

            },
            
        ]
    },
    {
        label: 'Gestionn des magasins',
        items: [
            {
                label: 'ajouter',

            },
            {
                label: 'modifier',

            },
            {
                label: 'afficher',

            },
            
        ]
    }, {
        label: 'Gestion des produits',
        items: [
            {
                label: 'ajouter',

            },
            {
                label: 'modifier',

            },
            {
                label: 'afficher',

            },
            
        ]
    },{
        label: 'Gestion des crédits',
        items: [
            {
                label: 'ajouter',

            },
            {
                label: 'modifier',

            },
            {
                label: 'afficher',

            },
            
        ]
    },
  ]
}
}



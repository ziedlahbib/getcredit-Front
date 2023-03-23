import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-sidenav-front',
  templateUrl: './sidenav-front.component.html',
  styleUrls: ['./sidenav-front.component.scss']
})
export class SidenavFrontComponent implements OnInit {

  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Univers Gaming',
        items: [
            {
                label: 'Console de jeux',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Console_de_jeux' },
            },
            {
                label: 'unité Gaming',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Unité_Gaming' }
            },
            {
                label: 'péréphériqe Gaming',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Perephérique_pc_gaming' }

            },
            {
                label: 'Composant PC Gaming',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Composant_PC_Gaming' },
            },
            {
                label: 'PC Portable',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'PC_Portable' },
            },
        ]
    },
    {
        label: 'Univers Informatique',
        items: [
            {
                label: 'Pc Portable',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'PC_Portable' },

            },
            {
                label: 'Pc De Bureau',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Pc_De_Bureau' },

            },
            {
                label: 'Péréphérique et Accessoire Stockage',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Péréphérique_et_Accessoire_Stockage' },
            }
            ,
            {
                label: 'Composant et maintenance',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Gaming', 'type': 'Composant_et_maintenance' },
            }
        ]
    },
    {
        label: 'Univers Telephonie',
        items: [
            {
                label: 'Smartphone',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Smartphone' },
            },
            {
                label: 'Apple',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Apple' },
            },
            {
                label: 'GSM',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'GSM' },
            },
            {
                label: 'Téléphone fixe',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Téléphone_fixe' },
            },
            {
                label: 'Accessoir telephoniies',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Accessoir_telephoniies' },
            },
            {
                label: 'Smartwatch',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Smartwatch' },
            },
            {
                label: 'Tablette',
                routerLink: ['/artcileparcategorietype'], queryParams: { 'cat': 'Univers_Telephonie', 'type': 'Tablette' },
            }
        ]
    },
  ]
  }

}

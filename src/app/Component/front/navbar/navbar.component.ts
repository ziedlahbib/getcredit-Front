import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {


    constructor(  ) { }

    ngOnInit(): void {


    }

   
}

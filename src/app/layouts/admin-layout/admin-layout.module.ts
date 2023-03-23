import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SidenavComponent } from 'src/app/Component/back/sidenav/sidenav.component';
import { NavbarBackComponent } from 'src/app/Component/back/navbar-back/navbar-back.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { ChipModule } from 'primeng/chip';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterBackComponent } from 'src/app/Component/back/footer-back/footer-back.component';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';






@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidenavComponent,
    NavbarBackComponent,
    FooterBackComponent,

    
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SlideMenuModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    ChipModule,
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AdminLayoutModule { }

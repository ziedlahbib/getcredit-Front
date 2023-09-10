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
import { EntrepriseManagementComponent } from 'src/app/pages/entreprise-management/entreprise-management.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';
import { EditUserComponent } from 'src/app/pages/user-management/edit-user/edit-user.component';
import { MagasinManagementComponent } from 'src/app/pages/magasin-management/magasin-management.component';
import { ProduitManagementComponent } from 'src/app/pages/produit-management/produit-management.component';
import { CreditManagementComponent } from 'src/app/pages/credit-management/credit-management.component';
import { AddEntrepriseComponent } from 'src/app/pages/entreprise-management/add-entreprise/add-entreprise.component';
import { AddMagasinComponent } from 'src/app/pages/magasin-management/add-magasin/add-magasin.component';
import { AddProduitComponent } from 'src/app/pages/produit-management/add-produit/add-produit.component';
import { AddCreditComponent } from 'src/app/pages/credit-management/add-credit/add-credit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModifierMotDePasseComponent } from 'src/app/pages/user-management/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { StepsModule } from 'primeng/steps';
import {MatStepperModule} from '@angular/material/stepper';
import { CreditrefmanagmentComponent } from 'src/app/pages/creditrefmanagment/creditrefmanagment.component';
import { StatistiqueComponent } from 'src/app/pages/statistique/statistique.component';





import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatistiqueEntrepriseComponent } from 'src/app/pages/statistique-entreprise/statistique-entreprise.component';
import { StatistiqueMagasinComponent } from 'src/app/pages/statistique-magasin/statistique-magasin.component';
import { UpdateproduitComponent } from 'src/app/pages/produit-management/updateproduit/updateproduit.component';
import { UpdatemagasinComponent } from 'src/app/pages/magasin-management/updatemagasin/updatemagasin.component';
import { UpdateentrepriseComponent } from 'src/app/pages/entreprise-management/updateentreprise/updateentreprise.component';
import { UpdateclientComponent } from 'src/app/pages/user-management/updateclient/updateclient.component';












@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidenavComponent,
    NavbarBackComponent,
    FooterBackComponent,
    UserManagementComponent,
    AddUserComponent,
    EditUserComponent,
    UpdateclientComponent,
    EntrepriseManagementComponent,
    AddEntrepriseComponent,
    UpdateentrepriseComponent,
    MagasinManagementComponent,
    AddMagasinComponent,
    UpdatemagasinComponent,
    ProduitManagementComponent,
    CreditManagementComponent,
    AddProduitComponent,
    UpdateproduitComponent,
    AddCreditComponent,
    ModifierMotDePasseComponent,
    CreditrefmanagmentComponent,
    StatistiqueComponent,
    StatistiqueEntrepriseComponent,
    StatistiqueMagasinComponent,


    
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
    MatSelectModule,
    PanelMenuModule,
    MatAutocompleteModule,
    StepsModule,
    MatStepperModule,
    NgApexchartsModule,
    

    
    
  ]
})
export class AdminLayoutModule { }

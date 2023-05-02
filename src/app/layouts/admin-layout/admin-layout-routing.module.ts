import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntrepriseComponent } from 'src/app/pages/entreprise-management/add-entreprise/add-entreprise.component';
import { EntrepriseManagementComponent } from 'src/app/pages/entreprise-management/entreprise-management.component';
import { AddMagasinComponent } from 'src/app/pages/magasin-management/add-magasin/add-magasin.component';
import { MagasinManagementComponent } from 'src/app/pages/magasin-management/magasin-management.component';
import { ForgotPasswordComponent } from 'src/app/pages/passwordmanagement/forgot-password/forgot-password.component';
import { AddProduitComponent } from 'src/app/pages/produit-management/add-produit/add-produit.component';
import { ProduitManagementComponent } from 'src/app/pages/produit-management/produit-management.component';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';
import { EditUserComponent } from 'src/app/pages/user-management/edit-user/edit-user.component';
import { ModifierMotDePasseComponent } from 'src/app/pages/user-management/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';



const routes: Routes = [
  { path: 'affichlistuser',       component: UserManagementComponent },
  { path: 'ajoutuser',       component: AddUserComponent },
  { path: 'edit-user/:id',       component: EditUserComponent },
  { path: 'modifier-mot-de-passe/:id',       component: ModifierMotDePasseComponent },
  { path: 'ajoutProduit',       component: AddProduitComponent },
  { path: 'affichlistEntreprise',       component: EntrepriseManagementComponent },
  { path: 'ajoutEntreprise',       component: AddEntrepriseComponent },
  { path: 'affichlistMagasins',       component: MagasinManagementComponent },
  { path: 'ajoutMagasin',       component: AddMagasinComponent },
  { path: 'affichlistProduits',       component: ProduitManagementComponent },
  { path: 'ajoutProduit',       component: AddProduitComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }

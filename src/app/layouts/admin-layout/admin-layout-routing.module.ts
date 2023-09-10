import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCreditComponent } from 'src/app/pages/credit-management/add-credit/add-credit.component';
import { CreditManagementComponent } from 'src/app/pages/credit-management/credit-management.component';
import { UpdatcreditComponent } from 'src/app/pages/credit-management/updatcredit/updatcredit.component';
import { CreditrefmanagmentComponent } from 'src/app/pages/creditrefmanagment/creditrefmanagment.component';
import { AddEntrepriseComponent } from 'src/app/pages/entreprise-management/add-entreprise/add-entreprise.component';
import { EntrepriseManagementComponent } from 'src/app/pages/entreprise-management/entreprise-management.component';
import { UpdateentrepriseComponent } from 'src/app/pages/entreprise-management/updateentreprise/updateentreprise.component';
import { AddMagasinComponent } from 'src/app/pages/magasin-management/add-magasin/add-magasin.component';
import { MagasinManagementComponent } from 'src/app/pages/magasin-management/magasin-management.component';
import { UpdatemagasinComponent } from 'src/app/pages/magasin-management/updatemagasin/updatemagasin.component';
import { ForgotPasswordComponent } from 'src/app/pages/passwordmanagement/forgot-password/forgot-password.component';
import { AddProduitComponent } from 'src/app/pages/produit-management/add-produit/add-produit.component';
import { ProduitManagementComponent } from 'src/app/pages/produit-management/produit-management.component';
import { UpdateproduitComponent } from 'src/app/pages/produit-management/updateproduit/updateproduit.component';
import { StatistiqueComponent } from 'src/app/pages/statistique/statistique.component';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';
import { EditUserComponent } from 'src/app/pages/user-management/edit-user/edit-user.component';
import { ModifierMotDePasseComponent } from 'src/app/pages/user-management/modifier-mot-de-passe/modifier-mot-de-passe.component';
import { UpdateclientComponent } from 'src/app/pages/user-management/updateclient/updateclient.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';



const routes: Routes = [
  { path: 'affichlistuser',       component: UserManagementComponent },
  { path: 'ajoutuser',       component: AddUserComponent },
  { path: 'edit-user/:id',       component: EditUserComponent },
  { path: 'edit-client/:id',       component: UpdateclientComponent },
  { path: 'modifier-mot-de-passe/:id',       component: ModifierMotDePasseComponent },
  { path: 'affichlistEntreprise',       component: EntrepriseManagementComponent },
  { path: 'ajoutEntreprise',       component: AddEntrepriseComponent },
  { path: 'updateentreprise/:id',       component: UpdateentrepriseComponent },
  { path: 'affichlistMagasins',       component: MagasinManagementComponent },
  { path: 'ajoutMagasin',       component: AddMagasinComponent },
  { path: 'updatemagasin/:id',       component: UpdatemagasinComponent },
  { path: 'affichlistProduits',       component: ProduitManagementComponent },
  { path: 'ajoutProduit',       component: AddProduitComponent },
  { path: 'updateProduit/:id',       component: UpdateproduitComponent },
  { path: 'addcredit/:id',       component: AddCreditComponent },
  { path: 'updatecredit/:id',       component: UpdatcreditComponent },
  { path: 'affichcredit',       component: CreditManagementComponent },
  { path: 'affichcreditref',       component: CreditrefmanagmentComponent },
  { path: 'affichstatitistique',       component: StatistiqueComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }

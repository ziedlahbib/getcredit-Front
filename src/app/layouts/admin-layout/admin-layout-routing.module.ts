import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEntrepriseComponent } from 'src/app/pages/entreprise-management/add-entreprise/add-entreprise.component';
import { EntrepriseManagementComponent } from 'src/app/pages/entreprise-management/entreprise-management.component';
import { MagasinManagementComponent } from 'src/app/pages/magasin-management/magasin-management.component';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';
import { EditUserComponent } from 'src/app/pages/user-management/edit-user/edit-user.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';



const routes: Routes = [
  { path: 'affichlistuser',       component: UserManagementComponent },
  { path: 'ajoutuser',       component: AddUserComponent },
  { path: 'edit-user/:id',       component: EditUserComponent },
  { path: 'affichlistEntreprise',       component: EntrepriseManagementComponent },
  { path: 'ajoutEntreprise',       component: AddEntrepriseComponent },
  { path: 'affichlistMagasins',       component: MagasinManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }

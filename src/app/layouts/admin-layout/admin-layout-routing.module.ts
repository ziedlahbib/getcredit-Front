import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';
import { EditUserComponent } from 'src/app/pages/user-management/edit-user/edit-user.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';



const routes: Routes = [
  { path: 'affichlistuser',       component: UserManagementComponent },
  { path: 'ajoutuser',       component: AddUserComponent },
  { path: 'edit-user/:id',       component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }

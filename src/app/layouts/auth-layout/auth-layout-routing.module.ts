import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ForgotPasswordComponent } from 'src/app/pages/passwordmanagement/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/passwordmanagement/reset-password/reset-password.component';



const authroutes: Routes = [
  { path: 'login',       component: LoginComponent },
  { path: 'forgotpassword',       component: ForgotPasswordComponent },
  { path: 'reset',       component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(authroutes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ForgotPasswordComponent } from 'src/app/pages/passwordmanagement/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/pages/passwordmanagement/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutRoutingModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    ButtonModule,
    TriStateCheckboxModule
  ]
})
export class AuthLayoutModule { }

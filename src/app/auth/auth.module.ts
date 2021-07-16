import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { authRoutes } from "./auth.router";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "./store/auth/auth.state";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(authRoutes),
    NgxsModule.forFeature([
      AuthState
    ])
  ]
})
export class AuthModule { }

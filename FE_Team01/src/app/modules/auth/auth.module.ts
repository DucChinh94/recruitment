import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SignupComponent } from './signup/signup.component';
import { TranstolinkComponent } from './transtolink/transtolink.component';
import { JobpublicComponent } from '../public/jobpublic/jobpublic.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NbLayoutModule } from '@nebular/theme';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    // {
    //   path: "signup",
    //   component: SignupComponent


    // },
    // {
    //   path: "sendotp",
    //   component: SendotpComponent


    // }

  ],
}, {
  path: "jobpublic",
  component: JobpublicComponent,
},];

@NgModule({
  declarations: [
    AuthComponent, SignupComponent, TranstolinkComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), MatSnackBarModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ]

})
export class AuthModule { }

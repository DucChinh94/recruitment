import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { JobpublicComponent } from './jobpublic/jobpublic.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShowdetailsjobComponent } from './jobpublic/showdetailsjob/showdetailsjob.component';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NbLayoutModule } from '@nebular/theme';
import { ProfileComponent } from '../home/profile/profile.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangepasswordComponent } from '../home/changepassword/changepassword.component';
import { WebSocketService } from '../../services/WebSocketService.service';
import { BrowserModule } from '@angular/platform-browser';



const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    {
      path: "jobpublic",
      component: JobpublicComponent,
    },
    {
      path: "showdetailsjob",
      component: ShowdetailsjobComponent,
    },
    {
      path: "changepassword",
      component: ChangepasswordComponent,
    },

    // },
    // {
    //   path: "sendotp",
    //   component: SendotpComponent


    // }
    {
      path: "profile",
      component: ProfileComponent,
    },
  ],
}];
@NgModule({
  declarations: [
    PublicComponent,
    JobpublicComponent,
    ShowdetailsjobComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule, MatPaginatorModule, MatListModule, MatDialogModule, NbLayoutModule, MatSnackBarModule


  ],
  providers: [WebSocketService],

})
export class PublicModule { }

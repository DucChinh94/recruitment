import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'primeng/api';
import { PrimengModule } from '../../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserlistsComponent } from './userlists/userlists.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeletejobEditerComponent } from './userlists/deletejob-editer/deletejob-editer.component';
import { MatInputModule } from '@angular/material/input';
import { AddjobeditorComponent } from './userlists/addjobeditor/addjobeditor.component';
import { EditjobeditorComponent } from './userlists/editjobeditor/editjobeditor.component';
import { JobComponent } from './job/job.component';
import { DetailsComponent } from './job/details/details.component';
import { StatiscalmanageComponent } from './statiscalmanage/statiscalmanage.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JobRegisterComponent } from './job-register/job-register.component';
import { JobRegisterDetailsComponent } from './job-register/job-register-details/job-register-details.component';
import { AddJobRegisterComponent } from './job-register/add-job-register/add-job-register.component';
import { DeleteComponent } from './job-register/delete/delete.component';
import { DownloadCvComponent } from './job-register/download-cv/download-cv.component';
import { ViewReasonsComponent } from './job-register/view-reasons/view-reasons.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AddjobComponent } from './job/addjob/addjob.component';
import { BookInterviewComponent } from './job-register/job-register-details/book-interview/book-interview.component';
import { MatChipsModule } from '@angular/material/chips';
import { ExportPDFComponent } from './job/export-pdf/export-pdf.component';
import { EditjobComponent } from './job/editjob/editjob.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      //loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'userlists',
      component: UserlistsComponent,
    },
    {
      path: 'statiscalmanage',
      component: StatiscalmanageComponent,
    },
    {
      path: 'job_register',
      component: JobRegisterComponent,
    },
    {
      path: 'job_regiser_details',
      component: JobRegisterDetailsComponent,
    },
    {
      path: 'jobcomponent',
      component: JobComponent,
    },

    {
      path: 'addjobcomponent',
      component: AddjobComponent,
    },

    {
      path: 'details',
      component: DetailsComponent
    },
    {
      path: 'changePassword',
      component: ChangepasswordComponent,
    },
    {
      path: 'exportPDf',
      component: ExportPDFComponent,
    },
    {
      path: 'editjob',
      component: EditjobComponent,
    }

  ],
}];

@NgModule({

  declarations: [

    HomeComponent,
    ProfileComponent,
    UserlistsComponent,
    StatiscalmanageComponent,
    DeletejobEditerComponent,
    AddjobeditorComponent,
    EditjobeditorComponent,
    JobComponent,
    DetailsComponent,
    JobRegisterComponent,
    JobRegisterDetailsComponent,
    AddJobRegisterComponent,
    DeleteComponent,
    DownloadCvComponent,
    ViewReasonsComponent,
    ChangepasswordComponent,
    AddjobComponent,
    BookInterviewComponent,
    ExportPDFComponent,
    EditjobComponent
  ],
  entryComponents: [DeletejobEditerComponent],
  imports: [
    MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatCardModule, MatCheckboxModule,
    MatInputModule, MatToolbarModule, MatSnackBarModule, MatChipsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    PrimengModule,
    SharedModule
  ],
})
export class HomeModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminControllerService } from '../../../../@core/services/adminController.service';
import { JobRegisterServiceService } from '../../../../services/job-register-service.service';
import { DeletejobEditerComponent } from '../../userlists/deletejob-editer/deletejob-editer.component';
import { DialogData } from '../../userlists/userlists.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'ngx-add-job-register',
  templateUrl: './add-job-register.component.html',
  styleUrls: ['./add-job-register.component.scss']
})
export class AddJobRegisterComponent implements OnInit {

  formAdd: FormGroup;
  public messages = '';
  constructor(private jobRegisterControlService: JobRegisterServiceService, private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }
  initForm() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      dateInterview: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      dateRegister: ['', [Validators.required, Validators.email]],
      typeInterview: ['', [Validators.required]],
      
    });
  }
  

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error } from 'console';
import { AdminControllerService } from '../../../../@core/services/adminController.service';
import { DialogData } from '../userlists.component';

@Component({
  selector: 'ngx-deletejob-editer',
  templateUrl: './deletejob-editer.component.html',
  styleUrls: ['./deletejob-editer.component.scss']
})
export class DeletejobEditerComponent implements OnInit {
  formDeactive: FormGroup;
  constructor(private admicontrolService: AdminControllerService, private fb: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<DeletejobEditerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }
  public messages = '';
  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.formDeactive = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  get f() {
    return this.formDeactive.controls;
  }

  deActiveJEConfirm(event: Event) {
    event.preventDefault();
    console.log(this.formDeactive.value);
    this.admicontrolService.deActiveJE(this.formDeactive.value.username).subscribe(
      Response => {
        if (Response.httpStatus === "OK") {
          alert("Deactive thành công!")
          this.dialogRef.close();
          this.router.navigate(['/home/userlists']);
        }
      }, error => {
        if (error.error.message === "Username không tồn tại") {
          this.messages = "Username không tồn tại";

        }
        else if (error.error.message === "Username này không phải JE") {
          this.messages = "Username này không phải JE";
        }
      }

    );
  }

  cancelAction(event: Event) {
    event.preventDefault();

  }

}

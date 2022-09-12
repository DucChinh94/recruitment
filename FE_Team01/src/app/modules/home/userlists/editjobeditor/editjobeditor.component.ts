import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnyAaaaRecord } from 'dns';
import { AdminControllerService } from '../../../../@core/services/adminController.service';
import { DataService } from '../../../../@core/services/data.service';
import { DialogData } from '../userlists.component';

@Component({
  selector: 'ngx-editjobeditor',
  templateUrl: './editjobeditor.component.html',
  styleUrls: ['./editjobeditor.component.scss']
})
export class EditjobeditorComponent implements OnInit {
  formUpdate: FormGroup;
  public messages = '';
  username = '';
  user: any;
  birthDay = '';
  constructor(private admicontrolService: AdminControllerService, private fb: FormBuilder, private router: Router
    , private dataService: DataService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditjobeditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.initForm();
    this.username = this.dataService.getUserNamxe();
    this.user = this.dataService.getUser();
    const birthday = this.user.birthDay.split('-');
    console.log(birthday);
    this.birthDay = birthday[2] + '-' + birthday[1] + '-' + birthday[0];
  }


  initForm() {
    this.formUpdate = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', Validators.pattern('^[0-9]{10}')],
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }
  get f() {
    return this.formUpdate.controls;
  }

  addJEConfirm(event: Event) {
    event.preventDefault();
    if (this.formUpdate.valid) {
      const birthday = this.formUpdate.value.birthDay.split('-');
      const birthDaynew = birthday[2] + '-' + birthday[1] + '-' + birthday[0];
      this.formUpdate.patchValue({ birthDay: birthDaynew });
      this.admicontrolService.updateJEInfor(this.formUpdate.value, this.username).subscribe(
        Response => {
          if (Response.httpStatus === "OK") {
            this._snackBar.open("Cập nhật thành công", "Đồng ý", {
              duration: 4000
            });
            this.dialogRef.close();
            this.router.navigate(['/home/userlists']);
          }
        }, error => {
          if (error.error.message === "Username đã tồn tại") {
            this.messages = "Username đã tồn tại";
          } else if (error.error.message === "Email đã tồn tại") {
            this.messages = "Email đã tồn tại";
          } else if (error.error.message === "Phone đã tồn tại") {
            this.messages = "Phone đã tồn tại";
          }
        });
    }
  }

  cancelAction(event: Event) {
    event.preventDefault();
  }

  birthday: any;
  checkkk: boolean;
  getbirthday(event: any) {
    this.birthday = event.target.value;
    this.checkkk = this.check();
    console.log(this.checkkk);
  }

  check(): boolean {
    if (Date.parse(this.birthday) < new Date().getTime()) {
      return true;
    }
    else {
      return false;
    }

  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../../../@core/services/data.service';
import { JobRegisterServiceService } from '../../../../../services/job-register-service.service';
import { EditjobeditorComponent } from '../../../userlists/editjobeditor/editjobeditor.component';
import { DialogData } from '../../../userlists/userlists.component';
import { JobRegisterDetailsComponent } from '../job-register-details.component';

@Component({
  selector: 'ngx-book-interview',
  templateUrl: './book-interview.component.html',
  styleUrls: ['./book-interview.component.scss']
})
export class BookInterviewComponent implements OnInit {
  formUpdate: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private jobRegisterService: JobRegisterServiceService, private sanckbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditjobeditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }
  check = '';
  adddress = '';
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formUpdate = this.fb.group({
      id: [''],
      dateInterview: ['', Validators.required],
      methodInterview: ['', Validators.required],
      addressInterview: ['', Validators.required],
    });
  }
  get f() {
    return this.formUpdate.controls;
  }

  chooseForm() {
    this.check = (<HTMLInputElement>document.getElementById('chooseForm')).value;
  }

  addJEConfirm(event: any) {
    const dateInterview = this.formUpdate.value.dateInterview;
    const dateInterviewFix = dateInterview.split('-')[2].split('T')[0] + '-' + dateInterview.split('-')[1] + '-' + dateInterview.split('-')[0] + ' ' + dateInterview.split('-')[2].split('T')[1] + ':00';
    // this.formUpdate.patchValue({ dateInterview: dateInterviewFix});
    this.formUpdate.patchValue({ id: this.dataService.getJobReg().id });
    console.log((<HTMLInputElement>document.getElementById('addressInterviewx')).value);
    // if ((<HTMLInputElement>document.getElementById('chooseForm')).value === "online") {
    //   this.formUpdate.patchValue({ addressInterview: (<HTMLInputElement>document.getElementById('addressInterviewx')).value });
    // }

    if (this.formUpdate.valid) {
      this.jobRegisterService.bookInterview(this.formUpdate.value).subscribe(
        () => {
          this.sanckbar.open("Hẹn lịch thành công", "Đồng ý", {
            duration: 3000
          });
          this.dialogRef.close();
        }
      );
    }
  }

  cancelAction(event: any) {

  }

}

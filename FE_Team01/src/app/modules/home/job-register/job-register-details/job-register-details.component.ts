import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { DataService } from '../../../../@core/services/data.service';
import { JobRegisterServiceService } from '../../../../services/job-register-service.service';
import { Statusdto } from '../../../../@core/dto/statusdto';
import { ReasonDto } from '../../../../@core/dto/reasonDto';
import { ViewReasonsComponent } from '../view-reasons/view-reasons.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookInterviewComponent } from './book-interview/book-interview.component';


@Component({

  selector: 'ngx-job-register-details',
  templateUrl: './job-register-details.component.html',
  styleUrls: ['./job-register-details.component.scss']
})
export class JobRegisterDetailsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'Fields', 'details',];
  check: boolean;
  statusdto: Statusdto = { jobRegisterId: 1, statusJobRegisterId: 7, reason: '' };
  reasonDto: ReasonDto;
  checkRefuse = false;
  id: any;
  jobPosition;
  workingForm;
  academicLevel;
  rank;
  checkRefuse1 = false;
  userContact;
  role = '';
  constructor(public router: Router, private jobRegisterController: JobRegisterServiceService, public dialog: MatDialog
    , public dataService: DataService, private jobRegisterService: JobRegisterServiceService,
    private snackbar: MatSnackBar) { }
  dataSource = this.dataService.getJobReg();

  ngOnInit(): void {
    // this.dataSource = this.dataService.getJobReg();
    console.log(this.dataSource);
    data: this.jobPosition;

  }

  statusJobRegister() {
    this.jobRegisterController.changeStatus(this.statusdto).subscribe(
      (Response) => {
        this.dataSource = Response.obj;
        this.checkRefuse = false;
        this.snackbar.open("Trạng thái " + Response.obj.statusJobRegister.code, "Đồng ý", {
          duration: 3000
        }).afterDismissed().subscribe(() => {

        });
      })
  }


  status2() {
    this.statusdto.jobRegisterId = this.dataSource?.id;
    this.statusdto.statusJobRegisterId = 3;
    if (document.getElementById("searchStr") !== null
      && document.getElementById("searchStr") !== undefined
      && (<HTMLInputElement>document.getElementById("searchStr")).value !== '') {
      this.statusdto.reason = (<HTMLInputElement>document.getElementById("searchStr")).value;
    }
    this.statusJobRegister();
  }

  success() {
    this.statusdto.jobRegisterId = this.dataSource?.id;
    this.statusdto.statusJobRegisterId = 5;
    this.statusJobRegister();
    this.checkRefuse1 = false;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  downloadCV() {

  }
  refuse() {
    this.statusdto.jobRegisterId = this.dataSource?.id;
    this.statusdto.statusJobRegisterId = 7;
    if (document.getElementById("searchStr") !== null
      && document.getElementById("searchStr") !== undefined
      && (<HTMLInputElement>document.getElementById("searchStr")).value !== '') {
      this.statusdto.reason = (<HTMLInputElement>document.getElementById("searchStr")).value;
    } else {
      this.statusdto.reason = "Không có lý do";
    }
    this.statusJobRegister();
  }

  cancel() {
    this.checkRefuse1 = false;
  }

  ok() {
    this.checkRefuse1 = true;
  }
  cancel1() {
    this.checkRefuse1 = false;
  }
  viewReasons() {
    this.dialog.open(ViewReasonsComponent);
    this.jobRegisterService.setReasons(this.dataSource);

  }

  inputReason() {
    this.checkRefuse = true;
  }
  bookInterview() {
    this.dataService.setJobReg(this.dataSource);
    this.dialog.open(BookInterviewComponent);
  }


}

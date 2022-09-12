import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../../../../@core/services/data.service';
import { JobControllerService } from '../../../../@core/services/jobcontroller.service';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  check = true;
  check2 = true;
  statusdto = { jobId: 1, statusId: 6 };
  checkRefuse1 = false;
  checkRefuse2 = false;
  checkRefuse3 = false;
  checkRefuse4 = false;
  constructor(private dataservice: DataService, private jobcontroller: JobControllerService, private snackbar: MatSnackBar, private router: Router) { }
  jobdetails: any;
  ngOnInit(): void {
    this.jobdetails = this.dataservice.getJobDetailsName();
    console.log(this.jobdetails);
    if (!localStorage.getItem("token").includes("ROLE_ADMIN") && !localStorage.getItem("token").includes("ROLE_JE")) {
      this.check = false;
    }

    if (!localStorage.getItem("token").includes("ROLE_ADMIN")) {
      this.check2 = false;
    }
  }
  approve() {
    this.checkRefuse1 = true;
  }
  cancel() {
    this.checkRefuse1 = false;
  }

  conrfirm() {
    this.statusdto.jobId = this.jobdetails.id;
    this.statusdto.statusId = 3;
    this.jobcontroller.UpdateStatus(this.statusdto).subscribe((Response) => {
      this.jobdetails = Response.obj;
      this.checkRefuse1 = false;
      this.snackbar.open("Trạng thái " + Response.obj.statusJob.description, "Đồng ý", {
        duration: 3000
      }).afterDismissed().subscribe(() => {

      });
    });

  }

  approve1() {
    this.checkRefuse2 = true;
  }
  cancel1() {
    this.checkRefuse2 = false;
  }

  conrfirm1() {
    this.statusdto.jobId = this.jobdetails.id;
    this.statusdto.statusId = 5;
    this.jobcontroller.UpdateStatus(this.statusdto).subscribe((Response) => {
      this.jobdetails = Response.obj;
      this.checkRefuse1 = false;
      this.snackbar.open("Trạng thái " + Response.obj.statusJob.description, "Đồng ý", {
        duration: 3000
      }).afterDismissed().subscribe(() => {

      });
    });

  }

  approve2() {
    this.checkRefuse3 = true;
  }
  cancel2() {
    this.checkRefuse3 = false;
  }

  conrfirm2() {
    this.statusdto.jobId = this.jobdetails.id;
    this.statusdto.statusId = 7;
    this.jobcontroller.UpdateStatus(this.statusdto).subscribe((Response) => {
      this.jobdetails = Response.obj;
      this.checkRefuse3 = false;
      this.snackbar.open("Trạng thái " + Response.obj.statusJob.description, "Đồng ý", {
        duration: 3000
      }).afterDismissed().subscribe(() => {

      });
    });
  }

  approve3() {
    this.checkRefuse4 = true;
  }
  cancel3() {
    this.checkRefuse4 = false;
  }

  conrfirm3() {
    this.statusdto.jobId = this.jobdetails.id;
    this.statusdto.statusId = 2;
    this.jobcontroller.UpdateStatus(this.statusdto).subscribe((Response) => {
      this.jobdetails = Response.obj;
      this.checkRefuse4 = false;
      this.snackbar.open("Trạng thái " + Response.obj.statusJob.description, "Đồng ý", {
        duration: 3000
      }).afterDismissed().subscribe(() => {

      });
    });


  }

  update() {
    this.dataservice.setJob(this.jobdetails);
    this.router.navigate(['/home/editjob']);
  }
}



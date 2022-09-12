import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminControllerService } from '../../../@core/services/adminController.service';
import { DataService } from '../../../@core/services/data.service';
import { JobRegisterServiceService } from '../../../services/job-register-service.service';
import { AddjobeditorComponent } from '../userlists/addjobeditor/addjobeditor.component';
import { DeletejobEditerComponent } from '../userlists/deletejob-editer/deletejob-editer.component';
import { EditjobeditorComponent } from '../userlists/editjobeditor/editjobeditor.component';
import { AddJobRegisterComponent } from './add-job-register/add-job-register.component';
import { DownloadCvComponent } from './download-cv/download-cv.component';
import { BookInterviewComponent } from './job-register-details/book-interview/book-interview.component';
import { JobRegisterDetailsComponent } from './job-register-details/job-register-details.component';
import { ViewReasonsComponent } from './view-reasons/view-reasons.component';

@Component({
  selector: 'ngx-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss']
})
export class JobRegisterComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'dateInterview', 'dateRegister', 'methodInterview', 'statusJobRegister'];
  dataSource: [];
  currentPage = 0;
  pageSize = 10;
  isLoading = false;
  totalRow = 0;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];
  obj = { "pageNumber": this.currentPage, "pageSize": this.pageSize };
  searchStr: string;
  sortStr: string;
  statusJobRegister = '';
  dateMax: String;
  dateMin: String;
  constructor(private http: HttpClient, public router: Router, private jobRegisterController: JobRegisterServiceService, public dialog: MatDialog, public dataService: DataService, public jobRegisterService: JobRegisterServiceService) {
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.jobRegisterController.getListJR(this.obj).subscribe(
      Response => {
        console.log(Response);
        this.dataSource = Response;
        this.dataSource.map(objs => {
        })
      }, error => {
        console.log(error);
      }
    );
  }
  pageChanged(event: PageEvent) {
    this.obj.pageSize = event.pageSize;
    this.obj.pageNumber = event.pageIndex;
    this.loadData();
  }
  deleteJR() {
    this.dialog.open(DeletejobEditerComponent);
  }

  editJR(element: any) {
    this.dataService.getUserName(element.userName);
    this.dialog.open(EditjobeditorComponent);
  }

  addJR() {
    this.dialog.open(AddJobRegisterComponent);
  }
  search() {
    // console.log((<HTMLInputElement>document.getElementById("dateMax")).value);
    if ((<HTMLInputElement>document.getElementById("searchStr")) !== null) {
      this.searchStr = (<HTMLInputElement>document.getElementById("searchStr")).value;
    }
    // if (this.sortStr === null || this.sortStr === undefined || this.sortStr === '') {
    //   this.jobRegisterController.getListJRWithSeach(this.obj, this.searchStr).subscribe(
    //     Response => {
    //       this.dataSource = Response;
    //       this.dataSource.map(objs => {
    //       })
    //     }, error => {
    //       console.log(error);
    //     }
    //   );
    // } else {
    //   this.jobRegisterController.getListJRWithBothS(this.obj, this.searchStr, this.sortStr).subscribe(
    //     Response => {
    //       this.dataSource = Response;
    //       this.dataSource.map(objs => {

    //       })
    //     }, error => {
    //       console.log(error);
    //     }
    //   );

    // }
    console.log(this.statusJobRegister);
    this.dateMax = (<HTMLInputElement>document.getElementById("dateMax")).value;
    this.dateMin = (<HTMLInputElement>document.getElementById("dateMin")).value;
    let dateMax1 = '';
    let dateMin1 = '';
    if (this.dateMax !== '') {
      dateMax1 = this.dateMax.split('-')[0] + '/' + this.dateMax.split('-')[1] + '/' + this.dateMax.split('-')[2];
    }

    if (this.dateMin !== '') {
      dateMin1 = this.dateMin.split('-')[0] + '/' + this.dateMin.split('-')[1] + '/' + this.dateMin.split('-')[2];
    }
    if (dateMax1 !== '' && dateMin1 !== '' && this.statusJobRegister !== '' && this.searchStr !== undefined && this.searchStr !== null && this.searchStr !== '') {
      this.jobRegisterController.getListJRWithDateMaxandMinAndStatusAndSearch(this.obj, dateMax1, dateMin1, this.statusJobRegister, this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );

    } if (dateMax1 !== '' && dateMin1 !== '' && this.statusJobRegister === '' && this.searchStr !== undefined && this.searchStr !== null && this.searchStr !== '') {
      this.jobRegisterController.getListJRWithDateMaxandMinAndSearch(this.obj, dateMax1, dateMin1, this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );

    }
    else if (dateMax1 !== '' && dateMin1 !== '' && this.statusJobRegister !== '' && (this.searchStr === undefined || this.searchStr === null || this.searchStr === '')) {
      this.jobRegisterController.getListJRWithDateMaxandMinAndStatus(this.obj, dateMax1, dateMin1, this.statusJobRegister).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );
    } else if (dateMax1 !== '' && dateMin1 !== '' && this.statusJobRegister === '' && (this.searchStr === undefined || this.searchStr === null || this.searchStr === '')) {
      this.jobRegisterController.getListJRWithDateMaxandMin(this.obj, dateMax1, dateMin1).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );
    } else if (dateMax1 !== '' && dateMin1 === '' && this.statusJobRegister === '' && (this.searchStr === undefined || this.searchStr === null || this.searchStr === '')) {
      this.jobRegisterController.getListJRWithDateMax(this.obj, dateMax1).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );
    } else if (dateMax1 === '' && dateMin1 !== '' && this.statusJobRegister === '' && (this.searchStr === undefined || this.searchStr === null || this.searchStr === '')) {
      this.jobRegisterController.getListJRWithDateMax(this.obj, dateMin1,).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );

    }
    else if (dateMax1 === '' && dateMin1 === '' && this.statusJobRegister !== '' && (this.searchStr === undefined || this.searchStr === null || this.searchStr === '')) {
      this.jobRegisterController.getListJRWithStatus(this.obj, this.statusJobRegister).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );
    } else if (dateMax1 !== '' && dateMin1 !== '' && this.statusJobRegister !== '' && (this.searchStr === undefined || this.searchStr === null || this.searchStr === '')) {
      this.jobRegisterController.getListJRWithDateMaxandMinAndStatus(this.obj, dateMax1, dateMin1, this.statusJobRegister).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );

    }
  }


  selectedStatus($event) {
    this.statusJobRegister = $event.target.value;
  }



  selected(event: any) {
    this.sortStr = event.target.value;

    this.jobRegisterController.getListJRwithSort(this.obj, this.sortStr).subscribe(
      Response => {
        this.dataSource = Response;
        this.dataSource.map(objs => {

        })
      }, error => {
        console.log(error);
      }
    );

  }


  showDetails(element: any) {
    this.dataService.setJobReg(element);
    this.router.navigate(["/home/job_regiser_details"]);

  }

  viewReasons(reasons: any) {
    this.dialog.open(ViewReasonsComponent);
    this.jobRegisterService.setReasons(reasons);

  }
  get sortByLastModifiedDesc() {

    return this.dataSource.sort((a: any, b: any) => {
      return <any>new Date(b.dataSource.jobRegister.dateRegister) - <any>new Date(a.dataSource.jobRegister.dateRegister);
    });
  }


  bookInterview() {
    this.dataService.setJobReg(this.dataSource);
    this.dialog.open(BookInterviewComponent);
  }







}

import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../jobservice/services.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../@core/services/data.service';
import { PageEvent } from '@angular/material/paginator';
import { DetailsComponent } from './details/details.component';
import { Route, Router } from '@angular/router';
import { AddjobComponent } from './addjob/addjob.component';

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  displayedColumns: string[] = ['name', 'jobPositionId', 'startRecruitmentDate', 'dueDate', 'salaryMax', 'salaryMin', 'statusJobId', 'views', 'details', 'reviews', 'export'];
  dataSource: [];
  currentPage = 0;
  pageSize = 5;
  isLoading = false;
  totalRow = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  obj = { "pageNumber": this.currentPage, "pageSize": this.pageSize };
  searchStr: string;
  sortStr: string;
  statusJob = '';
  maxSa: string;
  minSa: string;
  constructor(private jobController: ServicesService, public dialog: MatDialog, public dataService: DataService, public router: Router) { }
  loadData() {
    this.jobController.getListJobb(this.obj).subscribe(
      Response => {
        this.dataSource = Response;
        this.dataSource.map(objs => {
        })
      }, error => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.loadData();
  }

  pageChanged(event: PageEvent) {
    this.obj.pageSize = event.pageSize;
    this.obj.pageNumber = event.pageIndex;
    this.loadData();
  }

  showdetails(element: any) {
    this.dataService.setJobDetailsName(element);
    this.router.navigate(["/home/details"]);
  }

  search() {

    if ((<HTMLInputElement>document.getElementById("searchStr")) !== null) {
      this.searchStr = (<HTMLInputElement>document.getElementById("searchStr")).value;
    }
    if ((<HTMLInputElement>document.getElementById("minsa")) !== null) {
      this.minSa = (<HTMLInputElement>document.getElementById("minsa")).value;
    }
    if ((<HTMLInputElement>document.getElementById("maxsa")) !== null) {
      this.maxSa = (<HTMLInputElement>document.getElementById("maxsa")).value;
    }
    console.log(this.maxSa);
    if ((this.searchStr !== undefined && this.searchStr !== '') && (this.minSa !== undefined && this.minSa !== '') && (this.maxSa !== undefined && this.maxSa !== '') && this.statusJob !== '') {
      this.jobController.getListJRWithDateMinSaAndMaxSaAndStatusAndSearch(this.obj, this.minSa, this.maxSa, this.statusJob, this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );
    } else if ((this.searchStr !== undefined && this.searchStr !== '') && (this.minSa !== undefined && this.minSa !== '') && (this.maxSa !== undefined && this.maxSa !== '') && this.statusJob === '') {
      this.jobController.getListJRWithMinSaAndMaxSaAndSearch(this.obj, this.minSa, this.maxSa, this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {

          })
        }, error => {
          console.log(error);
        }
      );
    } else if ((this.searchStr !== undefined && this.searchStr !== '') && (this.minSa !== undefined && this.minSa !== '') && (this.maxSa === undefined || this.maxSa === '') && this.statusJob === '') {
      this.jobController.getListJRWithMinSaAndSearch(this.obj, parseInt(this.minSa), this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;

        }, error => {
          console.log(error);
        }
      );
    } else if ((this.searchStr !== undefined && this.searchStr !== '') && (this.minSa === undefined || this.minSa === '') && (this.maxSa === undefined || this.maxSa === '') && this.statusJob !== '') {
      this.jobController.getListJRWithSearchAndSatus(this.obj, this.searchStr, this.statusJob).subscribe(
        Response => {
          this.dataSource = Response;

        }, error => {
          console.log(error);
        }
      );
    } else if ((this.searchStr === undefined || this.searchStr === '') && (this.minSa !== undefined && this.minSa !== '') && (this.maxSa === undefined || this.maxSa === '') && this.statusJob !== '') {
      this.jobController.getListJRWithMinSaAndStatus(this.obj, this.minSa, this.statusJob).subscribe(
        Response => {
          this.dataSource = Response;

        }, error => {
          console.log(error);
        }
      );
    } else if ((this.searchStr === undefined || this.searchStr === '') && (this.minSa === undefined || this.minSa === '') && (this.maxSa !== undefined && this.maxSa !== '') && this.statusJob !== '') {
      this.jobController.getListJRWithMaxSaAndSatus(this.obj, this.maxSa, this.statusJob).subscribe(
        Response => {
          this.dataSource = Response;

        }, error => {
          console.log(error);
        }
      );
    }
  }
  selectedStatus(event: any) {
    this.statusJob = event.target.value;
  }

  selected(event: any) {
    this.sortStr = event.target.value;

    this.jobController.getListJwithSort(this.obj, this.sortStr).subscribe(
      Response => {
        this.dataSource = Response;
        this.dataSource.map(objs => {
          return { objs, birthDay: "ok" }
        })
      }, error => {
        console.log(error);
      }
    );

  }
  addJob() {
    this.router.navigate(["/home/addjobcomponent"]);
  }

  exportPDf(element: any) {
    this.dataService.setJob(element);
    this.router.navigate(["/home/exportPDf"]);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../../../@core/services/data.service';
import { JobControllerService } from '../../../@core/services/jobcontroller.service';
import { ServicesService } from '../../../jobservice/services.service';
import { ShowdetailsjobComponent } from './showdetailsjob/showdetailsjob.component';

@Component({
  selector: 'ngx-jobpublic',
  templateUrl: './jobpublic.component.html',
  styleUrls: ['./jobpublic.component.scss']
})
export class JobpublicComponent implements OnInit {

  constructor(private jobcontroller: JobControllerService, private dialog: MatDialog, public dataService: DataService, private jobServce: ServicesService) { }
  currentPage = 0;
  pageSize = 4;
  obj = { "pageNumber": this.currentPage, "pageSize": this.pageSize };
  data: any;
  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.jobServce.getListJobb(this.obj).subscribe(
      Response => {
        this.data = Response;

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

  takeJob(job: any) {
    this.dataService.setJob(job);
    if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined) {
      if (localStorage.getItem("token").split(",")[1].split(':')[1].replace('"', '').replace('"', '') !== 'ROLE_ADMIN'
        && localStorage.getItem("token").split(",")[1].split(':')[1].replace('"', '').replace('"', '') !== 'ROLE_JE') {
        this.jobcontroller.updateview(job.id).subscribe();
      } else {
        this.jobcontroller.updateview(job.id).subscribe();
      }
    } else {
      this.jobcontroller.updateview(job.id).subscribe();
    }
    this.dialog.open(ShowdetailsjobComponent);

  }

}

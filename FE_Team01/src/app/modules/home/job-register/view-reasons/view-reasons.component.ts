import { Component, OnInit } from '@angular/core';
import { JobRegisterServiceService } from '../../../../services/job-register-service.service';

@Component({
  selector: 'ngx-view-reasons',
  templateUrl: './view-reasons.component.html',
  styleUrls: ['./view-reasons.component.scss']
})
export class ViewReasonsComponent implements OnInit {

  constructor(public jobRegisterService: JobRegisterServiceService) { }

  reason: any;
  ngOnInit(): void {

    this.reason = this.jobRegisterService.getReasons();
  }

}

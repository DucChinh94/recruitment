import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ClientRequest } from 'http';
import { DataService } from '../../../@core/services/data.service';
import { JobControllerService } from '../../../@core/services/jobcontroller.service';
@Component({
  selector: 'ngx-statiscalmanage',
  templateUrl: './statiscalmanage.component.html',
  styleUrls: ['./statiscalmanage.component.scss']
})
export class StatiscalmanageComponent implements OnInit {
  lineChart: any;
  lineCanvas: any;
  myChart: any;
  puslishedJob = '';
  jobReg = '';
  jobRegWaitingFor = '';
  jobRegSuccess = '';
  jobReqFailed = '';
  jobRegInterviewing = '';
  jobviews = '';
  smalldate = '01012022';
  bigDate = '12122022';
  jobduesoon = '';
  month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  data: number[] = new Array();
  successJobData: number[] = new Array();
  pieData: number[] = new Array();
  constructor(private jobController: JobControllerService, private dataService: DataService) {

  }

  ngOnInit() {
    this.loadData();
    this.getJobpublished();
    this.getNumJobRegs();
    this.getNumJobRegsWithStatus1();
    this.getNumJobRegsWithStatus2();
    this.getNumJobRegsWithStatus3();
    this.getNumJobRegsWithStatus4();
    this.countJobDueSoon();
    this.countViewJob();
    this.getConuntJobNeeds(this.month);
    this.getConuntSucessJobreg(this.month);
    this.pieChartMethod();
    this.lineChartMethod();

  }

  selectedSmallDate(event: any) {
    const s = event.target.value;
    const sx = s.split('-');
    this.smalldate = sx[2] + sx[1] + sx[0];
    console.log(this.smalldate);
    //  this.smalldate = s.
  }

  selectedBigDate(event: any) {
    const s = event.target.value;
    const sx = s.split('-');
    this.bigDate = sx[2] + sx[1] + sx[0];
    console.log(this.bigDate)

    this.getJobpublished();
    this.getNumJobRegs();
    this.getNumJobRegsWithStatus1();
    this.getNumJobRegsWithStatus2();
    this.getNumJobRegsWithStatus3();
    this.getNumJobRegsWithStatus4();
  }

  getJobpublished() {
    this.jobController.getcountJobs().subscribe(
      Response => {
        this.puslishedJob = Response;
      }, error => {
        console.log(error);
      }
    );
  }

  getConuntJobNeeds(month: any[]) {
    for (let i = 0; i < month.length; i++) {
      this.jobController.getcountJobNeeds(month[i]).subscribe(
        Response => {
          this.data[i] = Response;
        }, error => {
          console.log(error);
        }
      );
    }

  }
  getConuntSucessJobreg(month: any[]) {
    for (let i = 0; i < month.length; i++) {
      this.jobController.getcountSuccessJobReg(month[i]).subscribe(
        Response => {
          this.successJobData[i] = Response;
        }, error => {
          console.log(error);
        }
      );
    }

  }

  getNumJobRegs() {
    this.jobController.getcountJobRegs().subscribe(
      Response => {
        console.log(Response);
        this.jobReg = Response;
      }, error => {
        console.log(error);
      }
    );
  }


  getNumJobRegsWithStatus1() {
    this.jobController.getcountJobRegsWithstatusId(1, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.jobRegWaitingFor = Response;
      }, error => {
        console.log(error);
      }
    );
  }
  getNumJobRegsWithStatus2() {
    this.jobController.getcountJobRegsWithstatusId(5, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.pieData[1] = Response;
      }, error => {
        console.log(error);
      }
    );
  }
  getNumJobRegsWithStatus3() {
    this.jobController.getcountJobRegsWithstatusId(3, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.jobRegInterviewing = Response;
      }, error => {
        console.log(error);
      }
    );
  }

  getNumJobRegsWithStatus4() {
    this.jobController.getcountJobRegsWithstatusId(6, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.pieData[0] = Response;
      }, error => {
        console.log(error);
      }
    );
  }

  countJobDueSoon() {
    this.jobController.getcountJobDueSoon().subscribe(
      Response => {
        this.jobduesoon = Response;
      }, error => {
        console.log(error);
      }
    );
  }
  countViewJob() {
    this.jobController.getcountViewjob().subscribe(
      Response => {
        this.jobviews = Response;
        console.log('view');
      }, error => {
        console.log(error);
      }
    );
  }


  loadData() {

  }


  title = 'angular8chartjs';
  canvas: any;
  ctx: any;

  // ngAfterViewInit() {
  //   this.pieChartMethod();
  //   this.lineChartMethod();

  // }


  pieChartMethod() {
    var theHelp = Chart.helpers;
    this.canvas = document.getElementById('myPieChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        datasets: [{
          label: '# of Votes',
          data: this.pieData,
          backgroundColor: [
            'rgb(237, 125, 49)',
            'rgb(68, 115, 197)'
          ],
          borderWidth: 1
        }],
        labels: ["Số ứng viên tuyển thất bại", "Số ứng viên tuyển thành công"]
      },
      options: {
        responsive: false,
      }
    }
    );
  }
  lineChartMethod() {
    this.lineCanvas = document.getElementById("lineCanvas");
    this.lineChart = new Chart(this.lineCanvas, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [
          {
            label: 'Số ứng viên cần tuyển',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(237, 125, 49,1)',
            borderColor: 'rgb(237, 125, 49)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(237, 125, 49)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.data,
            spanGaps: true,
          },
          {
            label: 'Số ứng viên tuyển thành công',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(68, 115, 197)',
            borderColor: 'rgb(68, 115, 197)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.successJobData,
            spanGaps: true,
          }

        ]
      }
    });
  }



}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../../@core/services/data.service';
import { DialogData } from '../../../home/userlists/userlists.component';

@Component({
  selector: 'ngx-showdetailsjob',
  templateUrl: './showdetailsjob.component.html',
  styleUrls: ['./showdetailsjob.component.scss']
})
export class ShowdetailsjobComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShowdetailsjobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService: DataService) { }
  job: any
  ngOnInit(): void {
    this.job = this.dataService.getJob();
  }

}

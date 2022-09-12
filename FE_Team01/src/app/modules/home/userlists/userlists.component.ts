import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminControllerService } from '../../../@core/services/adminController.service';
import { DataService } from '../../../@core/services/data.service';
import { AddjobeditorComponent } from './addjobeditor/addjobeditor.component';
import { DeletejobEditerComponent } from './deletejob-editer/deletejob-editer.component';
import { EditjobeditorComponent } from './editjobeditor/editjobeditor.component';
export interface User {
  userName: string;
  name: number;
  fullName: number;
  phoneNumber: string;
  email: string;
  birthDay: Date;
}
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'ngx-userlists',
  templateUrl: './userlists.component.html',
  styleUrls: ['./userlists.component.scss']
})
export class UserlistsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'userName', 'gender', 'name', 'phoneNumber', 'email', 'birthDay', 'edit', 'Status'];
  dataSource: [];
  currentPage = 0;
  pageSize = 5;
  isLoading = false;
  totalRow = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  obj = { "pageNumber": this.currentPage, "pageSize": this.pageSize };
  searchStr: string;
  sortStr: string;
  constructor(private admincController: AdminControllerService,
    private _snackBar: MatSnackBar, public dialog: MatDialog, public dataService: DataService) { }



  ngOnInit(): void {
    this.loadData();
  }



  loadData() {
    this.admincController.getListJE(this.obj).subscribe(
      Response => {
        this.dataSource = Response;

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

  deleteJE() {
    this.dialog.open(DeletejobEditerComponent);
  }

  editJE(element: any) {
    this.dataService.getUserName(element.userName);
    this.dataService.setUser(element);
    this.dialog.open(EditjobeditorComponent);
  }

  addJE() {
    this.dialog.open(AddjobeditorComponent);
  }
  search() {
    this.searchStr = (<HTMLInputElement>document.getElementById("searchStr")).value;
    if (this.sortStr === null || this.sortStr === undefined || this.sortStr === '') {
      this.admincController.getListJEWithSeach(this.obj, this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {
            return { objs, birthDay: "ok" }
          })
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.admincController.getListJEWithBothS(this.obj, this.searchStr, this.sortStr).subscribe(
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
  }



  selected(event: any) {
    this.sortStr = event.target.value;

    this.admincController.getListJEwithSort(this.obj, this.sortStr).subscribe(
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

  Active(element: any) {
    this.admincController.deActiveJE(element.userName).subscribe(
      Response => {
        if (Response.httpStatus === "OK") {
          this._snackBar.open("Thành công", "Đồng ý", {
            duration: 4000
          });
        }
      });
  }

}


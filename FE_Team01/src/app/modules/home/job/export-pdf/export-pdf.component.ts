import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../@core/services/data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPDFComponent implements OnInit {

  constructor(private dataService: DataService) { }
  job: any
  ngOnInit(): void {
    this.job = this.dataService.getJob();
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlContent');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }

}

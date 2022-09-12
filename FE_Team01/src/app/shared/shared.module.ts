import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule
} from '@nebular/theme';

import { NgxDatatableModule } from '@swimlane/ngx-datatable'


@NgModule({
  imports: [
    ReactiveFormsModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    })
  ],
  exports: [
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule
  ]

})
export class SharedModule { }

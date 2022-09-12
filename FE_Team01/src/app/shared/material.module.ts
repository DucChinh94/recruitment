import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatRippleModule,
  MatTabsModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatChipsModule,
  MatDialogModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatGridListModule,
];


@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule { }

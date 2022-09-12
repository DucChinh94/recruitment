import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-home',
  template: `
  <ngx-one-column-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>
`,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  menu = MENU_ITEMS;

}

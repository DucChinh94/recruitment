import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
      path: 'product',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule )
    }
  
  ],
}];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbMenuModule,
  ]
})
export class HomeModule { }

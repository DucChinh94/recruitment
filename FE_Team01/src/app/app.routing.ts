import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './@core/guards/auth.guard';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SendotpComponent } from './modules/auth/sendotp/sendotp.component';
import { ResetpwComponent } from './modules/auth/resetpw/resetpw.component';
import { TranstolinkComponent } from './modules/auth/transtolink/transtolink.component';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'public',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'sendotp',
    component: SendotpComponent,
  },
  {
    path: 'resetpw',
    component: ResetpwComponent,
  },
  {
    path: 'transtolink',
    component: TranstolinkComponent,
  }
  ,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },

];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

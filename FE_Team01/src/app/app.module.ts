/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { Interceptor } from './@core/interceptor/interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendotpComponent } from './modules/auth/sendotp/sendotp.component';
import { ResetpwComponent } from './modules/auth/resetpw/resetpw.component';
import { MatTableModule } from '@angular/material/table';
import { PublicModule } from './modules/public/public.module';
import { WebSocketService } from './services/WebSocketService.service';
import { MatBadgeModule } from '@angular/material/badge';


const configToast: any = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
  progressAnimation: 'increasing',
};


@NgModule({
  declarations: [AppComponent, SendotpComponent, ResetpwComponent],
  imports: [
    BrowserModule, MatTableModule, PublicModule, MatBadgeModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ToastrModule.forRoot(configToast),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

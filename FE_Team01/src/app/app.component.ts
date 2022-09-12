/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { UserlistsComponent } from './modules/home/userlists/userlists.component';
import { JobRegisterComponent } from './modules/home/job-register/job-register.component';
import { WebSocketService } from './services/WebSocketService.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService, private seoService: SeoService) {

  }


  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }



}

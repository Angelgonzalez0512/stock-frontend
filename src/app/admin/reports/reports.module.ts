import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { ReportProductComponent } from './report-product/report-product.component';
import { ReportTransactionComponent } from './report-transaction/report-transaction.component';
import { ReportActivityComponent } from './report-activity/report-activity.component';
import { ReportOrderFoodsComponent } from './report-order-foods/report-order-foods.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
@NgModule({
  declarations: [
    ReportsComponent,
    ReportProductComponent,
    ReportTransactionComponent,
    ReportActivityComponent,
    ReportOrderFoodsComponent,
    ReportUserComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ChartModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class ReportsModule { }

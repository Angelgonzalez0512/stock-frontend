import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { InputProductsComponent } from './input-products/input-products.component';
import { OutputProductsComponent } from './output-products/output-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailTransactionComponent } from './detail-transaction/detail-transaction.component';


@NgModule({
  declarations: [
    StockComponent,
    InputProductsComponent,
    OutputProductsComponent,
    DetailTransactionComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ]
})
export class StockModule { }

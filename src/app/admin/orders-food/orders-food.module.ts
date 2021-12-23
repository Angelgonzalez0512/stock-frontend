import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersFoodRoutingModule } from './orders-food-routing.module';
import { OrdersFoodComponent } from './orders-food.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    OrdersFoodComponent,
    DetailOrderComponent,
    EditOrderComponent
  ],
  imports: [
    CommonModule,
    OrdersFoodRoutingModule,
    SharedModule,
    TabViewModule
    
  ]
})
export class OrdersFoodModule { }

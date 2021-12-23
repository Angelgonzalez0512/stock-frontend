import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrdersFoodComponent } from './orders-food.component';

const routes: Routes = [
  {path:"",component:OrdersFoodComponent},
  {path:"detail/:id",component:DetailOrderComponent},
  {path:"edit/:id",component:EditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersFoodRoutingModule { }

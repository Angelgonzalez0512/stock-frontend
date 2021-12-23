import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTransactionComponent } from './detail-transaction/detail-transaction.component';
import { InputProductsComponent } from './input-products/input-products.component';
import { OutputProductsComponent } from './output-products/output-products.component';
import { StockComponent } from './stock.component';

const routes: Routes = [
  { path: '', component: StockComponent },
  { path: 'input', component: InputProductsComponent },
  { path: "output", component: OutputProductsComponent },
  {path: "detail/:id", component:DetailTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }

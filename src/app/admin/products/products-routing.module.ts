import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {path:"",component:ProductsComponent},
  {path:"create",component:CreateProductComponent},
  {path:"edit/:id",component:EditProductComponent},
  {path:"detail/:id",component:DetailProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

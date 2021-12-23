import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:"", component:AdminComponent,children:[
    {path:"",component:HomeComponent},
    {path:"users",loadChildren:()=>import("./users/users.module").then(e=>e.UsersModule)},
    {path:"products",loadChildren:()=>import("./products/products.module").then(e=>e.ProductsModule)},
    {path:"categories",loadChildren:()=> import("./categories/categories.module").then(e=>e.CategoriesModule)}, 
    {path:"stock",loadChildren:()=> import("./stock/stock.module").then(e=>e.StockModule)},
    {path:"activities",loadChildren:()=> import("./activities/activities.module").then(e=>e.ActivitiesModule)},
    {path:"orderfoods",loadChildren:()=> import("./orders-food/orders-food.module").then(e=>e.OrdersFoodModule)},
    {path:"units",loadChildren:()=> import("./unit/unit.module").then(e=>e.UnitModule)},
    {path:"reports",loadChildren:()=> import("./reports/reports.module").then(e=>e.ReportsModule)},
    {path:"statistics",loadChildren:()=> import("./statistics/statistics.module").then(e=>e.StatisticsModule)},
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

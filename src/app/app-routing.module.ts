import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path: '', loadChildren:()=>import("./public/public.module").then(e=>e.PublicModule)},
  {path:"admin", loadChildren:()=>import("./admin/admin.module").then(e=>e.AdminModule),canActivate:[AuthGuard]},
  {path:"**"  ,redirectTo:"/login",pathMatch:"full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

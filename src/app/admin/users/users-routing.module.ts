import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {path:"",component:UsersComponent},
  {path:"create",component:CreateUserComponent},
  {path:"edit/:id",component:EditUserComponent},
  {path:"detail/:id",component:DetailUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

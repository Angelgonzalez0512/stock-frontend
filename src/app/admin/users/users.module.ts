import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {SharedModule} from './../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';

@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DetailUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class UsersModule { }

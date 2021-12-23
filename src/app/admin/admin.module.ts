import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AvatarModule } from 'primeng/avatar';
import {SharedModule} from './../shared/shared.module';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {ChartModule} from 'primeng/chart';
@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent
  ],
  imports: [
    AvatarModule,
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    ChartModule
    
  ]
})
export class AdminModule { }

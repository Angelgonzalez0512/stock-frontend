import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { AvatarModule } from 'primeng/avatar';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AvatarModule,
    PublicRoutingModule,
    ButtonModule
  ]
})
export class PublicModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import {HttpClientModule} from '@angular/common/http'
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { ConfirmationService ,MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [AuthService,ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

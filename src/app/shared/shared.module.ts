import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationModule} from './navigation/navigation.module';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {BadgeModule} from 'primeng/badge';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SkeletonModule} from 'primeng/skeleton';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationModule
  ],
  exports:[
    FormsModule,
    NavigationModule,
    MenuModule,
    TableModule,
    ButtonModule,
    CardModule,
    NgSelectModule,
    BadgeModule,    
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    CalendarModule,
    ProgressSpinnerModule,
    SkeletonModule
  ]
})
export class SharedModule { }

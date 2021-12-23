import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {TabViewModule} from 'primeng/tabview';
FullCalendarModule.registerPlugins([ 
  dayGridPlugin,
  resourceTimeGridPlugin 
]);
@NgModule({
  declarations: [
    ActivitiesComponent,
    EditActivityComponent,
    DetailActivityComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    FullCalendarModule,
    SharedModule,
    TabViewModule
  ]
})
export class ActivitiesModule { }

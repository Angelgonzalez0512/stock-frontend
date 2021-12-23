import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
const routes: Routes = [
  {path:"",component:ActivitiesComponent},
  {path:"detail/:id",component:DetailActivityComponent},
  {path:"edit/:id",component:EditActivityComponent},
  {path:"calendar",component:CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }

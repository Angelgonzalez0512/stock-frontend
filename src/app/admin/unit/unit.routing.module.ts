import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { unitsComponent } from './unit.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
const routes: Routes = [
  {path:"",component:unitsComponent},
  {path:"create",component:CreateUnitComponent},
  {path:"edit/:id",component:EditUnitComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitRoutingModule } from './unit.routing.module';
import { unitsComponent } from './unit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';


@NgModule({
  declarations: [
    unitsComponent,
    CreateUnitComponent,
    EditUnitComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    SharedModule
  ]
})
export class UnitModule { }

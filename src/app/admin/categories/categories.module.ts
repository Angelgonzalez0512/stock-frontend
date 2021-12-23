import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    DetailCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }

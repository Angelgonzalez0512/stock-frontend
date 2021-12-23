import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
const routes: Routes = [
  {path:"",component:CategoriesComponent},
  {path:"create",component:CreateCategoryComponent},
  {path:"edit/:id",component:EditCategoryComponent},
  {path:"detail/:id",component:DetailCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  category: Category = new Category();
  loadingRegister: boolean = false;
  constructor(
    public _scategory: CategoryService,
    private messageService: MessageService,
    public router: Router,
    public activeroute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe((data) => {
      console.log(data);
      console.log(data.get('id'));
      this._scategory.detail(`${data.get('id')}`).subscribe((data) => {
        if (data.hasOwnProperty('success')) {
          const dat: any = data;
          if (dat.success) {
            this.router.navigate(['/admin/users']);
          }
        }
        this.category = data;
      });
    });
  }
  updateCategory(category: Category) {
    if (category._id) {
      this._scategory.edit(category._id, category).subscribe((data) => {
        if(data.success) {
          this.router.navigate(['/admin/categories']);
        }else{
          this.messageService.add({severity:"error",summary:"Actualizacion",detail:data.message});
        }
      });
    }
  }
}

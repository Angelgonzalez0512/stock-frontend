import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category: Category = new Category();
  loadingRegister: boolean = false;
  constructor(public _scategory: CategoryService,private messageService: MessageService, public router: Router) {

  }
  ngOnInit(): void {
  }
  registrar(user: Category) {
    this._scategory.create(user).subscribe((data) => {
      if (data.success) {
        this.router.navigate(["/admin/categories"]);
      } else {
        this.messageService.add({ severity: "error", summary: "Nuevo usuario", detail: data.message });
      }
    })

  }
}
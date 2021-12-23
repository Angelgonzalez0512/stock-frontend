import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  category: Category = new Category();
  loadingRegister: boolean = false;
  constructor(
    public _scategory: CategoryService,
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
}
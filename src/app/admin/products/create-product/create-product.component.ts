import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
 product: Product = new Product();
loadinregister: boolean = false;
categories:Category[]=[];
unidades:any[] = [];
constructor(public _sproduct: ProductService,public _unit:UnitService,public _scategory: CategoryService, private messageService: MessageService, public router: Router) {

}
ngOnInit(): void {
  this._scategory.all().subscribe((data:any)=>{
    var categories=data.categories;
    if(categories){
      categories=categories?.filter((cat:any)=>cat.estado=="activo");
      if(categories)this.categories=categories;
    }
  });
  this._unit.all().subscribe((data:any)=>{
    var unidades=data.units;
    if(unidades){
      unidades=unidades?.filter((unidad:any)=>unidad.estado=="activo");
      if(unidades)this.unidades=unidades;
    }
  })
}
registrar(product:Product ) {
  product.cantidad=0;
  this.loadinregister=true;
  this._sproduct.create(product).subscribe((data) => {
    this.loadinregister=false;
    if (data.success) {
      this.router.navigate(["/admin/products"]);
    } else {
      this.messageService.add({ severity: "error", summary: "Nuevo usuario", detail: data.message });
    }
  })
  }
}

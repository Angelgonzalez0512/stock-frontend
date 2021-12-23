import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UnitService } from 'src/app/core/services/unit.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
product: Product = new Product();
loadinregister: boolean = false;
categories:Category[]=[];
unidades:any[] = [];
  constructor(public _sproduct: ProductService,public _unit:UnitService,public _scategory: CategoryService,private messageService: MessageService, public router: Router,public activeroute:ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe(data=>{
      console.log(data);
      console.log(data.get("id"));
      this._sproduct.detail(`${data.get("id")}`).subscribe(data=>{
        if(data.hasOwnProperty("success")){
          const dat:any=data;
          if(dat.success){
            this.router.navigate(['/admin/users']);
          }
        }
        this._scategory.all().subscribe((data:any)=>{
          this.categories=data.categories;
        });
        this._unit.all().subscribe((data:any)=>{
          var unidades=data.units;
          if(unidades){
            unidades=unidades?.filter((unidad:any)=>unidad.estado=="activo");
            if(unidades)this.unidades=unidades;
          }
        })
        this.product=data;
      })

    })
  }
  updateProduct(product: Product) {
   
    if(product._id){
      this.loadinregister=true;
      this._sproduct.edit(product._id,product).subscribe(data=>{
        this.loadinregister=false;
        if(data?.success) {
          this.router.navigate(['/admin/products']);
        }else{
          this.messageService.add({severity:"error",summary:"Actualizar usuario",detail:"A ocurrido un error intentelo mas tarde"})
        }
      })
    }
    
  }
}
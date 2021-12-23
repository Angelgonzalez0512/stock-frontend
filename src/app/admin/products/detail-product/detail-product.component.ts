import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

product: Product = new Product();
loadinregister: boolean = false;

  constructor(public _sproduct: ProductService, public router: Router,public activeroute:ActivatedRoute) {

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
       
        this.product=data;
      })

    })
  }
  
}
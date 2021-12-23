import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/core/models/product';
import { Transaction } from 'src/app/core/models/transaction';
import { ProductService } from 'src/app/core/services/product.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-input-products',
  templateUrl: './input-products.component.html',
  styleUrls: ['./input-products.component.css']
})
export class InputProductsComponent implements OnInit {
  ladingRegister: boolean = false;
  input: Transaction = new Transaction();
  products: Product[] = [];
  paramsQuery = {
    filters: {}, first: 0,
    globalFilter: '',
    rows: 100,
    sortOrder: 1
  }
  constructor(private messageService: MessageService, private _sproducts: ProductService,public _stransaction:TransactionService) { }
  ngOnInit(): void {
    this._sproducts.pagination(this.paramsQuery).subscribe((data: any) => {
      this.products = data.products;
    })
  }
  searchProduct(value: string) {
    this.paramsQuery.globalFilter = value;
    if (value) {
      if (value.length > 3 || !value) {
        this._sproducts.pagination(this.paramsQuery).subscribe((data: any) => {
          console.log(data);
          this.products = data.products;
        })
      }
    }
  }
  selectedProduct() {
    const product = this.products.find((prod: Product) => prod._id == this.input.productoid);
    if (product) {
      this.input.codigo = product.codigo;
      this.input.preciounidad=product.precio;
      this.input.productoid=product._id;
    }
  }
  registerInput() {
    this.ladingRegister=true;
    this._stransaction.create(this.input).subscribe(data=>{
      if(data.success){
        
        this.messageService.add({severity:"success",summary:"Entrada de productos",detail:"Se registro correctamente"})
        this.input=new Transaction();
      }else{
        this.messageService.add({severity:"error",summary:"Entrada de productos",detail:data.message});
      }
      this.ladingRegister=false;
    })
    

  }
  

}

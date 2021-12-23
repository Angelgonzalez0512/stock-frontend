import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Area } from 'src/app/core/models/area';
import { Product } from 'src/app/core/models/product';
import { Transaction } from 'src/app/core/models/transaction';
import { ProductService } from 'src/app/core/services/product.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-output-products',
  templateUrl: './output-products.component.html',
  styleUrls: ['./output-products.component.css']
})
export class OutputProductsComponent implements OnInit {
  ladingRegister: boolean = false;
  output: Transaction = new Transaction();
  products: Product[] = [];
  productSelected: Product = new Product();
  paramsQuery = {
    filters: {}, first: 0,
    globalFilter: '',
    rows: 100,
    sortOrder: 1
  }
  areaselected:string = '';
  areas: Area[]=[];
  cedulas: string[]=[];
  constructor(private messageService: MessageService, private _sproducts: ProductService, public _stransaction: TransactionService) { }
  ngOnInit(): void {
    this._sproducts.pagination(this.paramsQuery).subscribe((data: any) => {
      this.products = data.products;
    })
    this._sproducts.areas().subscribe(data=>{
      this.areas=data;
    })
  }
  searchProduct(value: string) {
    this.paramsQuery.globalFilter = value;
    if (value) {
      if ((value.length %2)!=0) {
        this._sproducts.pagination(this.paramsQuery).subscribe((data: any) => {
          this.products = data.products;
        })
      }
    }
  }
  selectedProduct() {
    const product = this.products.find((prod: Product) => prod._id == this.output.productoid);
    if (product) {
      this.output.codigo = product.codigo;
      this.output.preciounidad = product.precio;
      this.output.productoid = product._id;
      this.productSelected = product;
    }
  }
  registerOutput() {
    
    if (this.output.cantidad && this.productSelected.cantidad) {
      if (this.output.cantidad <= this.productSelected.cantidad) {
        this.ladingRegister = true;
        this._stransaction.registerOutput(this.output).subscribe(data => {
          if (data.success) {
            this.messageService.add({ severity: "success", summary: "Salida de productos", detail: "Se registro correctamente" })
            this.output = new Transaction();
          } else {
            this.messageService.add({ severity: "error", summary: "Salida de productos", detail: data.message });
          }
          this.ladingRegister = false;
        })

      } else {

        this.ladingRegister = false;
        this.messageService.add({ severity: "error", summary: "Salida de producto", detail: "La cantidad de productos disponibles no es suficiente" });
      }
    }else{
      if(this.productSelected.cantidad==0){
      this.messageService.add({severity: "warn", summary: "Sin unidades",detail: "No cuenta con unidades de este producto"});
      }
      this.ladingRegister = false;
    }
    
  }
  selectedArea(id:string){
    const areaselect=this.areas.filter((a)=>a._id==id);
    this.output.cedula="";
    this.cedulas=[];
    if(areaselect.length){
      this.output.area=areaselect[0].area;
      if(areaselect[0].cedulas){
        this.cedulas=areaselect[0].cedulas;
      }
    }
  }

}
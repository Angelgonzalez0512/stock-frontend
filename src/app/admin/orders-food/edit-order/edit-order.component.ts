import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Area } from 'src/app/core/models/area';
import DetailOrder from 'src/app/core/models/detail-order';
import { OrderFoods } from 'src/app/core/models/order-foods';
import { Product } from 'src/app/core/models/product';
import { Transaction } from 'src/app/core/models/transaction';
import { OrderFoodsService } from 'src/app/core/services/order-foods.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order: OrderFoods = new OrderFoods();
  transaction: Transaction = new Transaction();
  loadinregister: boolean = false;
  loadingdata: boolean = true;
  btransaction:boolean = true;
  productSelected: Product = new Product();
  products: Product[] = [];
  areas:Area[] = [];
  areaselected:string="";
  cedulas:string[]=[];
  paramsQuery = {
    filters: {}, first: 0,
    globalFilter: '',
    rows: 100,
    sortOrder: 1
  };
  constructor(public _sorder: OrderFoodsService, public _sproducts: ProductService,public _stransaction:TransactionService, private messageService: MessageService, public router: Router, public activeroute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe(data => {
      console.log(data);
      console.log(data.get("id"));
      this._sorder.detail(`${data.get("id")}`).subscribe(data => {
        if (data.hasOwnProperty("success")) {
          const dat: any = data;
          if (dat.success) {
            this.router.navigate(['/admin/users']);
          }
        }
        console.log(data);
        
        this.order = data;
        if(this.order.fecha){
          this.order.fecha=this.order.fecha.split("T")[0];
        }
        this.areaselected=data.area?data.area:"";
       
        if(this.order.transaciones)
        this.findByIds(this.order.transaciones);
        this.loadingdata=false;
      })
    })
  
  }
 
  async findByIds(array:any[]){
   this._stransaction.findByIds(array).subscribe((data:any) => {
     if(data.success) {
      this.order.transaciones=data.transactions;
     }else{
       this.messageService.add({ severity: "error", summary: "",detail:data.message});
     }
    })
  }
  FinalizarPedido(){
  if(this.verificarDisponibilidad()){
    const obj={
      order:this.order,
      transaction: this.btransaction
    }
    this._sorder.endOrder(obj).subscribe(data=>{
      if(data?.success){
        this.messageService.add({severity:"success",detail:data.message});
      }else{
        this.messageService.add({severity:"error",detail:data.message});
      }
    })
  }else{
    this.messageService.add({severity:"info",detail:"No cuentas con la cantidad suficiente de algunos productos"});
  }
  }
  verificarDisponibilidad():boolean{
    if(this.order.detalles){
    for(var i=0;i<this.order.detalles.length;i++){
      var cantidadd=this.order.detalles[i].producto?.cantidad;
      var cantidadr=this.order.detalles[i].cantidad;
      if(cantidadd && cantidadr ){
          if(cantidadr>cantidadd){
          return false;
      }else if(cantidadd==0){
        return false;
      } 
    }
  }
  }
    return true;
  }
}
 
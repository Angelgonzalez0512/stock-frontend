import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderFoods } from 'src/app/core/models/order-foods';
import { OrderFoodsService } from 'src/app/core/services/order-foods.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  order: OrderFoods = new OrderFoods();
  loadinregister: boolean = false;
  constructor(public _sorder: OrderFoodsService,public _stransaction:TransactionService, private messageService: MessageService, public router: Router, public activeroute: ActivatedRoute) {
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
        if(this.order.transaciones)
        this.findByIds(this.order.transaciones);
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





  

}

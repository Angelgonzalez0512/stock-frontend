import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.css']
})
export class DetailTransactionComponent implements OnInit {

  transaction: Transaction = new Transaction();
  loadinregister: boolean = false;
    constructor(public _stransaction: TransactionService, public router: Router,public activeroute:ActivatedRoute) {
    }
    ngOnInit(): void {
      this.activeroute.paramMap.subscribe(data=>{
        this._stransaction.detail(`${data.get("id")}`).subscribe(data=>{
          if(data.hasOwnProperty("success")){
            const dat:any=data;
            if(dat.success){
              this.router.navigate(['/admin/users']);
            }
          }
          this.transaction=data;
        })
  
      })
    }
    
  }
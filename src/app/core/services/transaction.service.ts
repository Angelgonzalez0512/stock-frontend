import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService  extends BaseService<Transaction,string>{
  constructor(public http:HttpClient) {
    super(http,"transaction","_id");
   }
   public registerOutput(object:Transaction):Observable<any>{
     return this.http.post(`${this.url}/output`,object,{headers:this.headers()});
   }
   public findByIds(transactions:any[]):Observable<Transaction>{
    return this.http.post(`${this.url}/details`,{transactions:transactions},{headers:this.headers()});
   }
}

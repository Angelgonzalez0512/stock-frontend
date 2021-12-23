import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderFoods } from '../models/order-foods';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderFoodsService extends BaseService<OrderFoods,string> {
  constructor(public http:HttpClient) {
    super(http,"orderfoods","id");
  }
 /*   public insertTransaction(object:any):Observable<any>{
    return  this.http.post(`${this.url}/transaction`,object,{headers:this.headers()});
  }
  public deleteTransactin(object:any):Observable<any>{
    return this.http.post(`${this.url}/transaction/delete`,object,{headers:this.headers()});
  } */
  endOrder(object:any):Observable<any>{
   return this.http.post(`${this.url}/end`,object,{headers:this.headers()});
  }
}

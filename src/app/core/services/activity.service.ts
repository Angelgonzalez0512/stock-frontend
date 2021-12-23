import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { Transaction } from '../models/transaction';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseService<Activity,string> {
  constructor(public http:HttpClient) {
    super(http,"activity","id");
   }
   public insertTransaction(object:any):Observable<any>{
     return  this.http.post(`${this.url}/transaction`,object,{headers:this.headers()});
   }
   public deleteTransactin(object:any):Observable<any>{
     return this.http.post(`${this.url}/transaction/delete`,object,{headers:this.headers()});
   }
   public updateColaboradores(transaction:Transaction):Observable<any>{
     return this.http.post(`${this.url}/colaboradores`,transaction,{headers:this.headers()});
   }
   public calendar():Observable<any[]>{
     return this.http.get<any>(`${this.url}/calendar`,{headers:this.headers()});
   }
}

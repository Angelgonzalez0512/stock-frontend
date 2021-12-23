import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Unit from '../models/unit';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService  extends BaseService<any,string>{
  constructor(public http:HttpClient) {
    super(http,"report","id");
  }
  reportProducts(params:any):Observable<any>{
     return this.http.post(`${this.url}/product`,params,{headers:this.headers()});
  }
  reportActivities(params:any):Observable<any>{
    return this.http.post(`${this.url}/activity`,params,{headers:this.headers()});
 }
 reportStock(params:any):Observable<any>{
    return this.http.post(`${this.url}/stock`,params,{headers:this.headers()});
 }
 reportUsers(params:any):Observable<any>{
    return this.http.post(`${this.url}/user`,params,{headers:this.headers()});
 }
 reportOrdersFoods(params:any):Observable<any>{
    return this.http.post(`${this.url}/orderfoods`,params,{headers:this.headers()});
 }
}

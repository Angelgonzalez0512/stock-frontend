import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class IndicatorService  extends BaseService<any,string>{
  constructor(public http:HttpClient) {
    super(http,"indicator","id");
  }
  home():Observable<any>{
    return this.http.get(`${this.url}/home`,{headers:this.headers()});
  }
  productByCategory():Observable<any>{
    return this.http.get(`${this.url}/productbycategory`,{headers:this.headers()});
  }
  stock():Observable<any>{
    return this.http.get(`${this.url}/stock`,{headers:this.headers()});
  }
  ordersAndActivities():Observable<any>{
    return this.http.get(`${this.url}/ordersAndActivities`,{headers:this.headers()});
  }
}

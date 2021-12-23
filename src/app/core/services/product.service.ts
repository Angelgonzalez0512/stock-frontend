import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product,string> {

  constructor(public http:HttpClient) {
    super(http,"product","id");
   }
}

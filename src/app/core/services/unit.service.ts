import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Unit from '../models/unit';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService  extends BaseService<Unit,string>{
  constructor(public http:HttpClient) {
    super(http,"unit","id");
   }
}

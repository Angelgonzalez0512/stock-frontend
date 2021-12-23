import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/authUser';
import { User } from '../models/user';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User,string> {
  user:AuthUser=new AuthUser();
  constructor(public http:HttpClient,public router:Router) { 
    super(http, "user","id");
  }
  login(user:string,password:string):Observable<any> {
    return this.http.post(`${this.host}/auth/user`,{correo:user,password:password});
  }
}

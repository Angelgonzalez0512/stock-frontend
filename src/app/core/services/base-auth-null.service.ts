import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Config from '../interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class BaseAuthNullService<T,S>{
  public host:string=Config.host;
  constructor(public http:HttpClient,@Inject("link") public  link:string, @Inject("id")public id:S) {
  }
  get url():string {
    return `${this.host}/${this.link}`;
  }
  all():Observable<T[]>{
    return this.http.get<T[]>(this.url);
  }
  allPaginate(pageSize:number,pageIndex:number):Observable<T[]>{
    return this.http.get<T[]>(`${this.url}?pageSize=${pageSize}&pageIndex=${pageIndex}`);
  }
  detail(id:string):Observable<T>{
    return this.http.get<T>(`${this.url}/${id}`,{});
  }
  edit(id:string,object:T):Observable<any>{
    return this.http.put(`${this.url}/${id}`,object);
  }
  create(object:T):Observable<any>{
    return this.http.post(this.url,object);
  }
  
}
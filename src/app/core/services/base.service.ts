import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Config from '../interfaces/config';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class BaseService <T, S>{
  public host: string = Config.host;

  constructor(public http: HttpClient, @Inject("link") public link: string, @Inject("id") public id: S) {
  }

  get url(): string {
    return `${this.host}/${this.link}`;
  }
  all(): Observable<any> {
    return this.http.get<any>(this.url,{headers:this.headers()});
  }
  allPaginate(pageSize:number,pageIndex:number):Observable<any>{
    return this.http.get<any>(`${this.url}?pageSize=${pageSize}&pageIndex=${pageIndex}`, {headers:this.headers()});
  }
  pagination(data:any):Observable<any>{
    return this.http.post<any>(`${this.url}/paginate`,data,{headers:this.headers()});
  }
  detail(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`, {headers:this.headers()});
  }
  edit(id: string, object: T): Observable<any> {
    return this.http.put(`${this.url}/${id}`, object,{headers:this.headers()});
  }
  create(object: T): Observable<any> {
    return this.http.post(this.url, object,{headers:this.headers()});
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`,{headers:this.headers()});
  }
  areas():Observable<Area[]>{
    return this.http.get<Area[]>(`${this.host}/area`);
  }
  headers() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const encoded=decodeURI(token)
      const { jwt } = JSON.parse(encoded);
      const autorization = new HttpHeaders({
        "Authorization": `${jwt}`,
      });
      return autorization
    }else{
      console.log(token);
      return new HttpHeaders({})
    }
    
  }
}
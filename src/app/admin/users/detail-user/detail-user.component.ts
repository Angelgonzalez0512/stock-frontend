import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: User = new User();
  loadinregister: boolean = false;
 
  roles: any[] = [
    {id:0,name:"Rol"},
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" }
  ]
  areas: any[] = [
    {id:0,name:"Area"},
    { id: 1, name: "Administracion" },
    { id: 1, name: "Aceria" },
    { id: 1, name: "Largos" },
    { id: 1, name: "Patio chatarra" },
    { id: 1, name: "Tubos y viales" }
  ]
  cedulas: any[] = [
    {id:0,name:"Cedula"},
    { id: 1, name: "cedula1" },
    { id: 2, name: "cedula2" },
    { id: 3, name: "cedula3" },
    { id: 4, name: "cedula4" },
    { id: 5, name: "cedula5" },
  ]
  constructor(public _suser: UserService, private messageService: MessageService, public router: Router,public activeroute:ActivatedRoute) {

  }
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe(data=>{
      console.log(data);
      console.log(data.get("id"));
      this._suser.detail(`${data.get("id")}`).subscribe(data=>{
        if(data.hasOwnProperty("success")){
          const dat:any=data;
          if(dat.success){
            this.router.navigate(['/admin/users']);
          }
        }
        this.user=data;
      })

    })
  }
  
    
  
}

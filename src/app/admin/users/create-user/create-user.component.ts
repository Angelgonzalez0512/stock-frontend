import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Area } from 'src/app/core/models/area';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  loadinregister: boolean = false;
  areaselected: any;
  roles: any[] = [
    {id:0,name:"Rol"},
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" }
  ]
  areas:Area[]=[];
  cedulas:string[]=[];
  constructor(public _suser: UserService, private messageService: MessageService, public router: Router) {

  }
  ngOnInit(): void {
    this._suser.areas().subscribe(data=>{
      this.areas=data;
    })
  }
  registrar(user: User) {
    user.rol = `${user.rol}`.toLowerCase();
    this._suser.create(user).subscribe((data) => {
      if (data.success) {
        this.router.navigate(["/admin/users"]);
      } else {
        this.messageService.add({ severity: "error", summary: "Nuevo usuario", detail: data.message });
      }
    })

  }
  selectedArea(id:string){
    const areaselect=this.areas.filter((a)=>a._id==id);
    this.user.cedula="";
    this.cedulas=[];
    if(areaselect.length){
      this.user.area=areaselect[0].area;
      if(areaselect[0].cedulas){
        this.cedulas=areaselect[0].cedulas;
      }
    }
  }
}

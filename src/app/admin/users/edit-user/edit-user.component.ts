import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Area } from 'src/app/core/models/area';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = new User();
  loadinregister: boolean = false;
  selected: any;
  rolselected: any;
  areaselected:string = "";
  newpassword:string="";

  roles: any[] = [
    {id:0,name:"Rol"},
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" }
  ]
  areas: Area[]=[];
  cedulas:string[]=[];
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
        this.areaselected=data.area?data.area:"";
      })
      this._suser.areas().subscribe(data=>{
        this.areas=data;
        this.refreshArea(this.areaselected);
      })
    })
  }
  editar(user: User) {
    if(user._id){
      this._suser.edit(user._id,user).subscribe(data=>{
        if(data?.success) {
          this.router.navigate(['/admin/users']);
        }else{
          this.messageService.add({severity:"error",summary:"Actualizar usuario",detail:"A ocurrido un error intentelo mas tarde"})
        }
      })
    }
    
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
  refreshArea(area:string){
    console.log(area);
    
    const areaselect=this.areas.filter((a)=>a.area==area);
    this.cedulas=[];
    console.log(areaselect);
    
    if(areaselect.length){
      this.user.area=areaselect[0].area;
      if(areaselect[0].cedulas && areaselect[0]._id){
        this.areaselected=areaselect[0]._id;
        this.cedulas=areaselect[0].cedulas;
      }
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users:User[]=[];
  buscar:string = "";
  totalRows:number = 0;
  loading:boolean =true;
  constructor(public _susers:UserService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
  }
  clear(data:any){
    data.clear();
    this.buscar="";
  }
  loadUsers(event:any){ 
    this._susers.pagination(event).subscribe((data:any)=>{
      this.totalRows=data.totalRows;
      this.users=data.users;
      this.loading=false;
    })
  }
  exportExcel() {
    const data=this.users.map((user:any)=>{
      const {_id,password,createdAt,updatedAt,...rest}=user;
      return rest;
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "usuarios");
    });
}
saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
  delete(user:User) {
    this.confirmationService.confirm({
      message: 'Quieres dar de baja este usuario '+user.nombres +" ?",
      header: 'Dar de baja',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._susers.delete(user._id?user._id:"").subscribe(data=>{
          if(data.success){
            this.messageService.add({severity:'success', summary:'Proceso dar de baja', detail:'Se realizo correctamente'});
            user.estado="baja";
          }else{
            this.messageService.add({severity:'error', summary:'Proceso dar de baja', detail:data.message});       
          }
       })
     }
    });
}
}

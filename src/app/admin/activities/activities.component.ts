import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Activity } from 'src/app/core/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities:Activity[]=[];
  buscar:string = "";
  totalRows:number = 0;
  loading:boolean =true;
  constructor(public _activity:ActivityService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
  }
  clear(data:any){
    data.clear();
    this.buscar="";
  }
  loadActivities(event:any){ 
    this._activity.pagination(event).subscribe((data:any)=>{
      this.totalRows=data.totalRows;
      this.activities=data.activities;
      this.loading=false;
    })
  }
  exportExcel() {
    const data=this.activities.map((user:any)=>{
      const {_id,password,createdAt,updatedAt,...rest}=user;
      return rest;
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "actividades");
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
  delete(activity:Activity) {
    this.confirmationService.confirm({
      message: 'Quieres cancelar la actividad '+activity.nombre +" ?",
      header: 'Cancelar actividad',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._activity.delete(activity._id?activity._id:"").subscribe(data=>{
          if(data.success){
            this.messageService.add({severity:'success', summary:'Cancelar actividad', detail:'Cancelado correctamente'});
            activity.estado="cancelado";
          }else{
            this.messageService.add({severity:'error', summary:'Cancelar actividad', detail:data.message});       
          }
       })
     }
    });
}
}

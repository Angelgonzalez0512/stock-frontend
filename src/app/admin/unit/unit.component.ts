import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import Unit from 'src/app/core/models/unit';
import { UnitService } from 'src/app/core/services/unit.service';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class unitsComponent implements OnInit {
  index=0;
  units:Unit[]=[];
  buscar:string = "";
  totalRows:number = 0;
  loading:boolean =true;
  constructor(public _sunits:UnitService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
    this._sunits.all().subscribe((data:any)=>{
      this.totalRows=data.totalRows;
      this.units=data.units;
      this.loading=false;
      
    })
  }
  clear(data:any){
    data.clear();
    this.buscar="";
  }

  exportExcel() {
    const data=this.units.map((unit:any)=>{
      const {_id,createdAt,updatedAt,...rest}=unit;
      return rest;
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "unidades");
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
  delete(unit:Unit) {
    this.confirmationService.confirm({
      message: 'Quieres dar de baja la unidad '+unit.nombre +" ?",
      header: 'Dar de baja',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._sunits.delete(unit._id?unit._id:"").subscribe(data=>{
          if(data.success){
            this.messageService.add({severity:'success', summary:'Proceso dar de baja', detail:'Se realizo correctamente'});
            unit.estado="baja";
          }else{
            this.messageService.add({severity:'error', summary:'Proceso dar de baja', detail:data.message});       
          }
       })
     }
    });
}
}

import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ReportsService } from 'src/app/core/services/reports.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { Area } from 'src/app/core/models/area';
@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {
  areas:Area[]=[];
  rolselected:string = '';
  users:Product[] = [];
  areaselected:string = '';
  spinner:boolean = false;
  estateselected:string = '';
  exportColumns:any[] =[];
  search:boolean = false;
  loadingdata:boolean = true;
  constructor(public _category:CategoryService,public _report:ReportsService) { }

  ngOnInit(): void {
    this._category.areas().subscribe((data:any)=>{
      this.areas=data;
    })
    
  }
  searchProduct() {
    this.search=true;
    this.spinner=true;
    const params={
      area:this.areaselected,
      estado:this.estateselected,
      rol:this.rolselected
    };
    this._report.reportUsers(params).subscribe(data=>{
      console.log(data);
      this.users=data.users;
      this.loadingdata=false;
      this.spinner=false;
    })
  }
  exportPdf() {
 this.exportColumns=[
       {title: 'Nombres', dataKey: 'nombres'},
       {title: 'Apellidos', dataKey: 'apellidos'},
       {title:"Area",dataKey: 'area'},
       {title: 'Correo', dataKey: 'correo'},
       {title: 'Dni', dataKey: 'dni'},
       {title:"Rol",dataKey: 'rol'},
       {title: 'Estado', dataKey: 'estado'},
   ]
    const doc:any = new jsPDF(
      {
        orientation: "landscape",
      }
    );
    autoTable;
    doc.autoTable(this.exportColumns, this.users);
    doc.save('reporte_usuarios.pdf');
     
 }
   exportExcel() {
     const data=this.users.map((user:any)=>{
       const {_id,createdAt,updatedAt,password,...rest}=user;
      console.log(Object.assign(user));
       return {...rest};
     })
     import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(data);
         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "reporte_usuarios");
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
}

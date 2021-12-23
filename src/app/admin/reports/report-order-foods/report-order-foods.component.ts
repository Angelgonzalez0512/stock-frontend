import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ReportsService } from 'src/app/core/services/reports.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as moment from 'moment';
import { Area } from 'src/app/core/models/area';
@Component({
  selector: 'app-report-order-foods',
  templateUrl: './report-order-foods.component.html',
  styleUrls: ['./report-order-foods.component.css']
})
export class ReportOrderFoodsComponent implements OnInit {
  areas:Area[]=[];
  orders:Product[] = [];
  areaselected:string = '';
  spinner:boolean = false;
  estateselected:string = '';
  exportColumns:any[] =[];
  selecteddate =
  {
    start: moment().startOf('month'), end: moment().endOf('month')
  };
  search:boolean = false;
  loadingdata:boolean = true;
  constructor(public _category:CategoryService,public _report:ReportsService) { }

  ngOnInit(): void {
    this._category.areas().subscribe((data:any)=>{
      this.areas=data;

    })
  }
  searchOrders() {
    this.search=true;
    this.spinner=true;
    const params={
      area:this.areaselected,
      estado:this.estateselected,
      date:this.selecteddate
    };
    this._report.reportOrdersFoods(params).subscribe(data=>{
      console.log(data);
      this.orders=data.ordersfood;
      this.loadingdata=false;
      this.spinner=false;
    })
  }
  exportPdf() {
 this.exportColumns=[
       {title: 'Codigo', dataKey: 'codigo'},
       {title: 'Fecha', dataKey: 'fecha'},
       {title:"Area",dataKey: 'area'},
       {title:"Usuario",dataKey: 'nombres'},
       {title: 'Cedula', dataKey: 'cedula'},
       {title: 'Estado', dataKey: 'estado'},
     ]
    const doc:any = new jsPDF();
    autoTable;
    doc.autoTable(this.exportColumns,this.orders);
    doc.autoTable(this.exportColumns, this.orders);
    doc.save('reporte_pedido_alimentos.pdf');
 }
   exportExcel() {
     const data=this.orders.map((producto:any)=>{
       const {_id,createdAt,updatedAt,...rest}=producto;
       return {...rest };
     })
     import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(data);
         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "reporte_pedido_alimentos");
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

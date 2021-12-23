import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { Product } from 'src/app/core/models/product';
import { CategoryService } from 'src/app/core/services/category.service';
import { ReportsService } from 'src/app/core/services/reports.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent implements OnInit {
  categories:Category[]=[];
  products:Product[] = [];
  categoryselected:string = '';
  spinner:boolean = false;
  estateselected:string = '';
  exportColumns:any[] =[];
  search:boolean = false;
  loadingdata:boolean = true;
  constructor(public _category:CategoryService,public _report:ReportsService) { }

  ngOnInit(): void {
    this._category.all().subscribe((data:any)=>{
      this.categories=data.categories;
    })
  }
  searchProduct() {
    this.search=true;
    this.spinner=true;
    const params={
      categoria:this.categoryselected,
      estado:this.estateselected
    };
    this._report.reportProducts(params).subscribe(data=>{
      console.log(data);
      this.products=data.products;
      this.loadingdata=false;
      this.spinner=false;
    })
  }
  exportPdf() {
 this.exportColumns=[
       {title: 'Codigo', dataKey: 'codigo'},
       {title: 'Producto', dataKey: 'nombre'},
       {title:"Categoria",dataKey: 'categoria'},
       {title: 'Cantidad', dataKey: 'cantidad'},
       {title: 'Precio/U', dataKey: 'precio'},
       {title: 'Estado', dataKey: 'estado'},
   ]
    const doc:any = new jsPDF();
    autoTable;
    doc.autoTable(this.exportColumns, this.products);
    doc.save('reporte_productos.pdf');
     
 }
   exportExcel() {
     const data=this.products.map((producto:any)=>{
       const {_id,createdAt,updatedAt,...rest}=producto;
       return {...rest };
     })
     import("xlsx").then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(data);
         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "reporte_productos");
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

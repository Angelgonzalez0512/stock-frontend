import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction';
import { TransactionService } from 'src/app/core/services/transaction.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  transaccion:string="ingreso";
  transactions:Transaction[]=[];
  exportColumns:any[]=[];
  totalRows:number = 0;
  buscar:string="";
  constructor(public router:Router,public _stransaction:TransactionService) { }
  ngOnInit(): void {
  }
  exportPdf() {
   /*  area	cedula	producto	codigo	preciounidad	cantidad	factura	fecha	descripcion	tipo	producto nombre */
    this.exportColumns=[
      {title: 'Codigo', dataKey: 'codigo'},
      {title: 'Area', dataKey: 'area'},
      {title: 'Cedula', dataKey: 'cedula'},
      {title: 'Precio/U', dataKey: 'preciounidad'},
      {title: 'Cantidad', dataKey: 'cantidad'}, 
      {title: 'Factura', dataKey: 'factura'},
      {title: 'Descripcion', dataKey: 'descripcion'},
      {title: 'Tipo transaccion', dataKey: 'tipo'},
  ]
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc:any = new jsPDF.default();
            doc.autoTable(this.exportColumns, this.transactions);
            doc.save('products.pdf');
        })
    })
}
  exportExcel() {
    const data=this.transactions.map((transaction:any)=>{
      const {_id,createdAt,updatedAt,producto,...rest}=transaction;
      return {...rest,'producto nombre':transaction.producto.nombre,'precio producto':transaction.producto.precio, 'categoria producto':transaction.producto.categoria };
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "transacciones");
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
  goTrasaction(): void {
    if(this.transaccion){
      if(this.transaccion=="ingreso"){
        this.router.navigate(['/admin/stock/input']);
      }else{
        this.router.navigate(['/admin/stock/output']);
      }
    }

  }
  loadTransactions(event:any){
    this._stransaction.pagination(event).subscribe((data:any)=>{
      this.transactions=data.transactions;
      this.totalRows=data.totalRows;
    })
  }
  clear(data:any){

  }
}

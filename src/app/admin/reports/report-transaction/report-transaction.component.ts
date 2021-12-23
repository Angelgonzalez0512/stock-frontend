import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import * as moment from 'moment';
import { CategoryService } from 'src/app/core/services/category.service';
import { ReportsService } from 'src/app/core/services/reports.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { Transaction } from 'src/app/core/models/transaction';
@Component({
  selector: 'app-report-transaction',
  templateUrl: './report-transaction.component.html',
  styleUrls: ['./report-transaction.component.css']
})
export class ReportTransactionComponent implements OnInit {

  categories: Category[] = [];
  transactions: Transaction[] = [];
  categoryselected: string = '';
  spinner: boolean = false;
  estateselected: string = '';
  exportColumns: any[] = [];
  search: boolean = false;
  selecteddate =
    {
      start: moment().startOf('month'), end: moment().endOf('month')
    };
  loadingdata: boolean = true;
  constructor(public _category: CategoryService, public _report: ReportsService) { }

  ngOnInit(): void {
    this._category.all().subscribe((data: any) => {
      this.categories = data.categories;
    })
  }
  searchStock() {
    this.search = true;
    this.spinner = true;
    const params = {
      tipo: this.estateselected,
      date:this.selecteddate
    };
    this._report.reportStock(params).subscribe(data => {
      this.transactions = data.transactions;
      this.loadingdata = false;
      this.spinner = false;
    })
  }
  exportPdf() {
    this.exportColumns = [
      { title: 'Codigo', dataKey: 'codigo' },
      { title: 'Producto', dataKey: 'producto' },
      { title: "Fecha", dataKey: 'fecha' },
      { title:"Factura", dataKey: 'factura' },
      { title: 'Cantidad', dataKey: 'cantidad' },
      { title: 'Precio/U', dataKey: 'preciounidad' },
      {title:"Total",dataKey: 'subtotal'},
      { title: 'Tipo', dataKey: 'tipo' },
    ]
    const data = this.transactions.map((transaction: any) => {
      const { createdAt, updatedAt, _id, producto,area,cedula,factura,preciounidad, ...rest } = transaction;
      return { ...rest,"subtotal":"S/ "+(transaction.cantidad*transaction.preciounidad),"area":transaction.area?transaction.area:"-","preciounidad":"S/ "+transaction.preciounidad,"cedula":transaction.cedula?transaction.cedula:"-","factura":transaction.factura?transaction.factura:"-", "producto": transaction.producto.nombre, "fecha": transaction.fecha ? moment(transaction.fecha).format("DD/MM/YYYY") : "" };
    })
    const doc: any = new jsPDF({
      orientation: "landscape",
    });
    autoTable;
    doc.autoTable(this.exportColumns, data);
    doc.save('reporte_transaccion.pdf');
  }
  exportExcel() {
    const data = this.transactions.map((transaction: any) => {
      const { createdAt, updatedAt, _id, producto,area,cedula,factura,preciounidad,fecha,cantidad, ...rest } = transaction;
      return { ...rest,"Codigo Producto": transaction.producto.codigo,"Fecha": transaction.fecha ? moment(transaction.fecha).format("DD/MM/YYYY") : "" ,"Area":transaction.area?transaction.area:"-","Cedula":transaction.cedula?transaction.cedula:"-","Factura":transaction.factura?transaction.factura:"-", "Producto": transaction.producto.nombre,"Precio":transaction.preciounidad,"cantidad":transaction.cantidad,"Total":"S/ "+(transaction.cantidad*transaction.preciounidad)};
    })
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reporte_transaccion");
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

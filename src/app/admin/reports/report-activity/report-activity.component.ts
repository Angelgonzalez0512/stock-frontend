import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { ReportsService } from 'src/app/core/services/reports.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Activity } from 'src/app/core/models/activity';
import * as moment from 'moment';
import { Transaction } from 'src/app/core/models/transaction';
@Component({
  selector: 'app-report-activity',
  templateUrl: './report-activity.component.html',
  styleUrls: ['./report-activity.component.css']
})
export class ReportActivityComponent implements OnInit {

  categories: Category[] = [];
  activities: Activity[] = [];
  tiposelected: string = '';
  spinner: boolean = false;
  selecteddate =
    {
      start: moment().startOf('month'), end: moment().endOf('month')
    };
  estateselected: string = '';

  exportColumns: any[] = [];
  search: boolean = false;
  loadingdata: boolean = true;

  constructor(public _category: CategoryService, public _report: ReportsService) { }
  ngOnInit(): void {
    this._category.all().subscribe((data: any) => {
      this.categories = data.categories;
    })

  }
  searchProduct() {
    this.search = true;
    this.spinner = true;
    if (this.selecteddate.start && this.selecteddate.end) {
      const params = {
        date:this.selecteddate,
        tipo: this.tiposelected,
        estado: this.estateselected
      };
      this._report.reportActivities(params).subscribe(data => {
        this.activities = this.calcularTotalActivity(data.activities);
        this.loadingdata = false;
        this.spinner = false;
      })
    }
  }
  exportPdf() {
    this.exportColumns = [
      { title: 'Codigo', dataKey: 'codigo' },
      { title: 'Nombre', dataKey: 'nombre' },
      { title: 'Area', dataKey: 'area' },
      { title: 'Cedula', dataKey: 'cedula' },
      { title: "Fecha inicio", dataKey: 'fechainicio' },
      { title: 'Fecha fin', dataKey: 'fechafin' },
      { title: 'Fecha solicitud', dataKey: 'createdAt' },
      {title:'Gastos',dataKey: 'total'},
      { title: 'Estado', dataKey: 'estado' },
    ]
    const data=this.activities.map((activity:any) => {
      const {createdAt,updatedAt,fechainicio,fechafin,_id,total,...rest}=activity;
      return {...rest,"total": "S/ "+activity.total,"fechainicio":fechainicio?moment(fechainicio).format("DD/MM/YYYY"):"-","fechafin":fechafin?moment(fechafin).format("DD/MM/YYYY"):"-","createdAt":moment(createdAt).format("DD/MM/YYYY")};
    })
    const total=this.calcularTotal(this.activities);
    const FooterTotal:Activity =new Activity();
    FooterTotal.createdAt="Total S/. "
    FooterTotal.total=total;
    data.push(FooterTotal);
    const doc: any = new jsPDF({
      orientation: "landscape",
    });
    autoTable;
    doc.autoTable(this.exportColumns, data);
    doc.save('reporte_actividades.pdf');

  }
  public calcularTotalActivity(array:Activity[]):Activity[] {   
    array.forEach((item:Activity)=>{
      if(item.transacciones?.length){
      item.total=item.transacciones?.reduce((acumulate,value)=>{
        return acumulate+=(value.cantidad*value.preciounidad);
      },0);
      }else{
        item.total=0;
      }
    })
    return array;
  }
  public calcularTotal(array:Activity[]):number {   
    var total=0;
    total=array.reduce((acumulate,value:any)=>{
        return acumulate+=value.total;
    },0);  
    return total;
  }
  exportExcel() {
    const data = this.activities.map((activity: any) => {
      const { _id, createdAt, updatedAt, ...rest } = activity;
      return { ...rest };
    })
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "reporte_actividades");
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Activity } from 'src/app/core/models/activity';
import { Product } from 'src/app/core/models/product';
import { Transaction } from 'src/app/core/models/transaction';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.css']
})
export class DetailActivityComponent implements OnInit {

  activity: Activity = new Activity();
  transaction: Transaction = new Transaction();
  loadinregister: boolean = false;
  costoActividad: number = 0;
  loadingregistercolaborador: boolean = false;
  constructor(public _sactivity: ActivityService, public _sproducts: ProductService, public _stransaction: TransactionService, private messageService: MessageService, public router: Router, public activeroute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe(data => {
      console.log(data);
      console.log(data.get("id"));
      this._sactivity.detail(`${data.get("id")}`).subscribe(data => {
        if (data.hasOwnProperty("success")) {
          const dat: any = data;
          if (dat.success) {
            this.router.navigate(['/admin/users']);
          }
        }
        this.activity = data;
        if (data.fechafin && data.fechainicio) {
          this.activity.fechafin = data.fechafin.split("T")[0];
          this.activity.fechainicio = data.fechainicio.split("T")[0];
        }
        if (this.activity.transacciones)
          this.findByIds(this.activity.transacciones);
      })
    })
  }
  calcularTotal() {
    this.costoActividad = 0;
    if (this.activity.transacciones) {
      this.costoActividad = this.activity.transacciones.reduce((acumulator: number, value: any) => {
        return acumulator += (value.cantidad * value.preciounidad);
      }, 0);
    }
  }
  findByIds(array: any[]) {
    this._stransaction.findByIds(array).subscribe((data: any) => {
      if (data.success) {
        this.activity.transacciones = data.transactions;
        this.calcularTotal();
      } else {
        this.messageService.add({ severity: "error", summary: "", detail: data.message });
      }
    })
  }
  exportExcelProducts() {
    if (this.activity.transacciones) {
      const data = this.activity.transacciones.map((transaction: any) => {
        const { cantidad, preciounidad } = transaction;
        return { "Producto": transaction.producto?.nombre, "Cantidad": cantidad, "Precio": preciounidad };
      })
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.activity.nombre ? this.activity.nombre : "actividad");
      });
    }
  }
  exportExcelUser() {
    if (this.activity.colaboradores) {
      const data = this.activity.colaboradores.map((colaborador: any) => {
        const { ...rest } = colaborador;
        return rest;
      })
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, this.activity.nombre ? this.activity.nombre : "colaboradores");
      });
    }
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
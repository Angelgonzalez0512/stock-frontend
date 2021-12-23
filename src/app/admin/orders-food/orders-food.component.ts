import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderFoods } from 'src/app/core/models/order-foods';
import { OrderFoodsService } from 'src/app/core/services/order-foods.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-orders-food',
  templateUrl: './orders-food.component.html',
  styleUrls: ['./orders-food.component.css']
})
export class OrdersFoodComponent implements OnInit {
  orders:OrderFoods[]=[];
  buscar:string = "";
  totalRows:number = 0;
  loading:boolean =true;
  constructor(public _orderfoods:OrderFoodsService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
  }
  clear(data:any){
    data.clear();
    this.buscar="";
  }
  loadOrders(event:any){ 
    this._orderfoods.pagination(event).subscribe((data:any)=>{
      this.totalRows=data.totalRows;
      this.orders=data.ordersfoods;
      this.loading=false;
    })
  }
  exportExcel() {
    const data=this.orders.map((order:any)=>{
      const {_id,password,createdAt,updatedAt,detalles,otrosproductos,transaciones,usuario,...rest}=order;
      return rest;
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "pedidos");
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
  delete(order:OrderFoods) {
    this.confirmationService.confirm({
      message: 'Deseas cancelar esta orden?',
      header: 'Cancelar',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._orderfoods.delete(order._id?order._id:"").subscribe(data=>{
          if(data.success){
            this.messageService.add({severity:'success', summary:'Cancelar orden', detail:'La orden se a cancelado'});
            order.estado="cancelado";
          }else{
            this.messageService.add({severity:'error', summary:'Cancelar orden', detail:data.message});       
          }
       })
     }
    });
}
}

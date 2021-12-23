import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[]=[];
  buscar:string = "";
  totalRows:number = 0;
  loading:boolean =true;
  constructor(public _sproducts:ProductService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
  }
  clear(data:any){
    data.clear();
    this.buscar="";
  }
  loadProducts(event:any){ 
    this._sproducts.pagination(event).subscribe((data:any)=>{
      this.totalRows=data.totalRows;
      this.products=data.products;
      this.loading=false;
    })
  }
  exportExcel() {
    const data=this.products.map((user:any)=>{
      const {_id,password,createdAt,updatedAt,...rest}=user;
      return rest;
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "productos");
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
  delete(product:Product) {
    this.confirmationService.confirm({
      message: 'Quieres dar de baja este usuario '+product.nombre +" ?",
      header: 'Dar de baja',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._sproducts.delete(product._id?product._id:"").subscribe(data=>{
          if(data.success){
            this.messageService.add({severity:'success', summary:'Proceso dar de baja', detail:'Se realizo correctamente'});
            product.estado="baja";
          }else{
            this.messageService.add({severity:'error', summary:'Proceso dar de baja', detail:data.message});       
          }
       })
     }
    });
}
}

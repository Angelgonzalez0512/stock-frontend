import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category';
import * as FileSaver from 'file-saver';
import { CategoryService } from 'src/app/core/services/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  index=0;
  categories:Category[]=[];
  buscar:string = "";
  totalRows:number = 0;
  loading:boolean =true;
  constructor(public _scategories:CategoryService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
    this._scategories.all().subscribe((data:any)=>{
      this.totalRows=data.totalRows;
      this.categories=data.categories;
      this.loading=false;
    })
  }
  clear(data:any){
    data.clear();
    this.buscar="";
  }

  exportExcel() {
    const data=this.categories.map((category:any)=>{
      const {_id,createdAt,updatedAt,...rest}=category;
      return rest;
    })
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "categorias");
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
  delete(category:Category) {
    this.confirmationService.confirm({
      message: 'Quieres dar de baja la categoria '+category.denominacion +" ?",
      header: 'Dar de baja',
      icon: 'pi pi-info-circle',
      accept: () => {
        this._scategories.delete(category._id?category._id:"").subscribe(data=>{
          if(data.success){
            this.messageService.add({severity:'success', summary:'Proceso dar de baja', detail:'Se realizo correctamente'});
            category.estado="baja";
          }else{
            this.messageService.add({severity:'error', summary:'Proceso dar de baja', detail:data.message});       
          }
       })
     }
    });
}
}

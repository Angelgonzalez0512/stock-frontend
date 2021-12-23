import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Activity } from 'src/app/core/models/activity';
import { Area } from 'src/app/core/models/area';
import { Product } from 'src/app/core/models/product';
import { Transaction } from 'src/app/core/models/transaction';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  activity: Activity = new Activity();
  transaction: Transaction = new Transaction();
  loadinregister: boolean = false;
  loadingregistercolaborador:boolean = false;
  costoActividad:number=0;
  colaborador = {
    nombre: '', cargo: ''
  }
  productSelected: Product = new Product();
  products: Product[] = [];
  areas:Area[] = [];
  areaselected:string="";
  cedulas:string[]=[];
  paramsQuery = {
    filters: {}, first: 0,
    globalFilter: '',
    rows: 100,
    sortOrder: 1
  };

  constructor(public _sactivity: ActivityService, public _sproducts: ProductService,public _stransaction:TransactionService, private messageService: MessageService, public router: Router, public activeroute: ActivatedRoute) {
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
        this.areaselected=data.area?data.area:"";
        if(data.fechafin && data.fechainicio){
        this.activity.fechafin=data.fechafin.split("T")[0];
        this.activity.fechainicio=data.fechainicio.split("T")[0];
      }
        if(this.activity.transacciones)
        this.findByIds(this.activity.transacciones);
      })
    })
    this._sactivity.areas().subscribe(data=>{
      this.areas=data;
      this.refreshArea(this.areaselected);
    })
  }
  updateActivity(activity: Activity) {
    if (activity._id) {
      this.loadinregister = true;
      this._sactivity.edit(activity._id, activity).subscribe(data => {
        console.log(data);
        this.loadinregister = false;
        if (data?.success) {
          this.router.navigate(['/admin/activities']);
        } else {
          this.messageService.add({ severity: "error", summary: "Actualizar actividad", detail: "A ocurrido un error intentelo mas tarde" })
        }
      })
    }
  }
  async findByIds(array:any[]){
   this._stransaction.findByIds(array).subscribe((data:any) => {
     if(data.success) {
      this.activity.transacciones=data.transactions;
      this.calcularTotal();
     }else{
       this.messageService.add({ severity: "error", summary: "",detail:data.message});
     }
    })
  }
  registerColaborador(colaborador: any) {
    this.loadingregistercolaborador=true;
    if (this.activity.colaboradores) {
      this.activity.colaboradores.push(colaborador);
      this._sactivity.updateColaboradores(this.activity).subscribe(data => {
        this.loadingregistercolaborador=false;
        if(data.success) {
          this.messageService.add({severity:"success",summary:"", detail:"Colaborador registrado"});
          this.activity.colaboradores=data.activity.colaboradores;
          this.colaborador = {
            nombre: '', cargo: ''
          }
        }else{
          this.messageService.add({severity:"error",summary:"",detail:data.message});
        }
      })
    }else{
      this.loadingregistercolaborador=false;
    }
  }

  searchProduct(value: string) {
    this.paramsQuery.globalFilter = value;
    if (value) {
      if ((value.length % 2) != 0) {
        this._sproducts.pagination(this.paramsQuery).subscribe((data: any) => {
          this.products = data.products;
        })
      }
    }
  }
  selectedProduct() {
    const product = this.products.find((prod: Product) => prod._id == this.transaction.productoid);
    if (product) {
      this.transaction.codigo = product.codigo;
      this.transaction.preciounidad = product.precio;
      this.transaction.productoid = product._id;
      this.productSelected = product;
      this.transaction.fecha = new Date().toLocaleDateString();
    }
  }
  registerProducto() {
    if (this.transaction.cantidad && this.productSelected.cantidad) {
      if (this.transaction.cantidad <= this.productSelected.cantidad) {
        const object = {
          id: this.activity._id,
          transaction: this.transaction
        }
        this._sactivity.insertTransaction(object).subscribe(data => {
          if(data.success) {
            this.findByIds(data.activity.transacciones);
            this.messageService.add({severity:"success",summary:"",detail:"Producto agregado correctamente"});
          }else{
            this.messageService.add({severity:"error",summary:"",detail:"A ocurrido un error intentelo mas tarde"});
          }
        })
      } else {
        this.messageService.add({severity:"warn",summary:"",detail:"No se cuenta con la cantidad requerida"});
      }
    }else{
      if(this.productSelected.cantidad==0){
        this.messageService.add({severity:"warn",summary:"",detail:"Este producto no tiene unidades disponibles"});
      }
    }

  }
  deleteProducto(id:string) {
        const object = {
          id: this.activity._id,
          transactionid: id
        }
        this._sactivity.deleteTransactin(object).subscribe(data => {
          if(data.success) {
            this.findByIds(data.activity.transacciones);
            this.messageService.add({severity:"success",summary:"",detail:"Producto eliminado correctamente"});
          }else{
            this.messageService.add({severity:"error",summary:"",detail:"A ocurrido un error intentelo mas tarde"});
          }
        })
  }
  deleteColaborador(index: number) {
    if (this.activity.colaboradores)
      this.activity.colaboradores.splice(index, 1);
      this._sactivity.updateColaboradores(this.activity).subscribe(data => {
        if(data.success) {
          this.messageService.add({severity:"success",summary:"", detail:"Se elimino correctamente"});
          this.activity.colaboradores=data.activity.colaboradores;
          this.colaborador = {
            nombre: '', cargo: ''
          }
        }else{
          this.messageService.add({severity:"error",summary:"",detail:data.message});
        }
      })
  }
  selectedArea(id:string){
    const areaselect=this.areas.filter((a)=>a._id==id);
    this.activity.cedula="";
    this.cedulas=[];
    if(areaselect.length){
      this.activity.area=areaselect[0].area;
      if(areaselect[0].cedulas){
        this.cedulas=areaselect[0].cedulas;
      }
    }
  }
  refreshArea(area:string){
    console.log(area);
    
    const areaselect=this.areas.filter((a)=>a.area==area);
    this.cedulas=[];
    console.log(areaselect);
    
    if(areaselect.length){
      this.activity.area=areaselect[0].area;
      if(areaselect[0].cedulas && areaselect[0]._id){
        this.areaselected=areaselect[0]._id;
        this.cedulas=areaselect[0].cedulas;
      }
    }
  }
  calcularTotal(){
    this.costoActividad=0;
    if (this.activity.transacciones) {
      this.costoActividad = this.activity.transacciones.reduce((acumulator: number, value: any) => {
        return acumulator += (value.cantidad * value.preciounidad);
      }, 0);
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/core/services/activity.service';
import { IndicatorService } from 'src/app/core/services/indicator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activities:any[]=[];
  data:any;
  loadingdata:boolean=true;
  datainput:number[]=[];
  dataoutput:number[]=[];
  datalabel:string[]=[];
  targetas={
    activities:{ 
        terminadas:0, 
        desarrollo:0
    },
    transactions:{ 
      ingreso:0, 
      salida:0,
      mes:"--"
    },
    users:{ 
        activos:0, 
        registrados:0
    },
    orders:{ 
        atendidos:0, 
        pendientes:0
    }
  }
  constructor(
    public _sactivity:ActivityService, public _indicator:IndicatorService
  ) { 
   
  }

  ngOnInit(): void {
   
    this._indicator.home().subscribe(data=>{
      this.activities=data.activities;
      this.datalabel=data.chartline.labels;
      this.datainput=data.chartline.ingreso;
      this.dataoutput=data.chartline.salida;
      this.initChart();
      this.loadingdata=false;
      this.targetas=data.targetas;
    })
  }
  public initChart(){
    this.data = {
      labels: this.datalabel,
      datasets: [
          {
              label: 'Ingresos S/ ',
              data: this.datainput,
              fill: true,
              borderColor: '#FFA726',
              tension: .4,
              backgroundColor: 'rgba(255,167,38,0.2)'
          },
          {
            label: 'Salida S/ ',
            data: this.dataoutput,
            fill: true,
            borderColor: '#2196F3',
            tension: .4,
            backgroundColor: 'rgba(0,0,250,0.1)'
        }
      ]
  }
  }
}

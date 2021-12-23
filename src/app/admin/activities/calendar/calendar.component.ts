import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Activity } from 'src/app/core/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(public _sactivity:ActivityService) { }
  events:any[]=[];
  showCalendar:boolean=false;
  calendarOptions: CalendarOptions = {};
  ngOnInit(): void {
    this._sactivity.calendar().subscribe((data:any)=>{
      const actividades=data.activities;
      if(actividades){
        actividades.forEach((actividad:Activity,index:any)=>{
          if(actividad.fechainicio && actividad.fechafin){
            var bg="blue";
            var text="#fff";
            var border="blue";
            if(actividad.estado=="pendiente"){
              text="#000";
              border="#FBC02D";
              bg="#FBC02D";
            }
            else if(actividad.estado=="proceso"){
              text="#fff";
              border="#4baaf5";
              bg="#4baaf5";
            }
            else{
              text="#fff";
              border="#689F38";
              bg="#689F38";
             }
            this.events.push({id:index,title:actividad.nombre,start:actividad.fechainicio,end:actividad.fechafin,backgroundColor:bg,textColor:text,borderColor:border });
          }
        });
      this.initCalendar();    
      }
    })
  }
  initCalendar(){
  this.calendarOptions=  {
      initialView: 'dayGridMonth',
      events:this.events,
      selectable: true,
      showNonCurrentDates:false,
      timeZone: 'UTC',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      buttonText:{
        today:    'Hoy',
        month:    'Mes',
        week:     'Semana',
        day:      'dia',
        list:     'lista'
      },
    
      select: function(info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr);
      },
      locale:"es"
    };
  
    this.showCalendar=true;
  }

}

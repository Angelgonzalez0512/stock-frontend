import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Unit from 'src/app/core/models/unit';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css'],
})
export class EditUnitComponent implements OnInit {
  unit: Unit = new Unit();
  loadingRegister: boolean = false;
  constructor(
    public _unit: UnitService,
    private messageService: MessageService,
    public router: Router,
    public activeroute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe((data) => {
    
      this._unit.detail(`${data.get('id')}`).subscribe((data) => {
        if (data.hasOwnProperty('success')) {
          const dat: any = data;
          if (dat.success) {
            this.router.navigate(['/admin/units']);
          }
        }
        this.unit = data;
      });
    });
  }
  updateUnit(unit: Unit) {
    if (unit._id) {
      this._unit.edit(unit._id, unit).subscribe((data) => {
        if(data.success) {
          this.router.navigate(['/admin/units']);
        }else{
          this.messageService.add({severity:"error",summary:"Actualizacion",detail:data.message});
        }
      });
    }
  }
}

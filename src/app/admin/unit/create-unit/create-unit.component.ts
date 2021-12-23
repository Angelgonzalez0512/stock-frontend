import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/core/models/category';
import Unit from 'src/app/core/models/unit';
import { CategoryService } from 'src/app/core/services/category.service';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {
  unit: Unit = new Unit();
  loadingRegister: boolean = false;
  constructor(public _unit: UnitService,private messageService: MessageService, public router: Router) {

  }
  ngOnInit(): void {
  }
  registrar(unit: Unit) {
    this._unit.create(unit).subscribe((data) => {
      if (data.success) {
        this.router.navigate(["/admin/units"]);
      } else {
        this.messageService.add({ severity: "error", summary: "Nueva unidad", detail: data.message });
      }
    })

  }
}
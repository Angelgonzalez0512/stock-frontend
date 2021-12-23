import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/core/models/authUser';

@Component({
  selector: 'app-sider-bar',
  templateUrl: './sider-bar.component.html',
  styleUrls: ['./sider-bar.component.css']
})
export class SiderBarComponent implements OnInit {
  initials:string ="";
  @Input("user") user:AuthUser=new AuthUser();
  constructor() { }
  ngOnInit(): void {
    if (this.user.nombres && this.user.apellidos) {
      this.initials = this.user.nombres[0] + this.user.apellidos[0];
    }
  }
}

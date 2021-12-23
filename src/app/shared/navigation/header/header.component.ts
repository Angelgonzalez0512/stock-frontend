import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/core/models/authUser';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input("user") user:AuthUser=new AuthUser();
  initials: string = "AN";
  constructor(public _router: Router) {
  }
  ngOnInit() {
    if (this.user.nombres && this.user.apellidos) {
      this.initials = this.user.nombres[0] + this.user.apellidos[0];
    }
  }
  public exitapp(): void {
    localStorage.removeItem("auth_token")
    this._router.navigate(["/login"]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../core/models/authUser';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  auth: AuthUser = new AuthUser();
  loading: boolean = true;
  constructor(public authService: AuthService, public router: Router) {
    if (localStorage.getItem("auth_token")) {
      const value = localStorage.getItem("auth_token");
      try {
        const json = decodeURI(value != null ? value : "");
        const { user } = JSON.parse(json);

        this.authService.detail(user).subscribe((data: any) => {
          if (data == null) {
            localStorage.removeItem("auth_token");
            this.router.navigate(["/"]);
          } else if (data.hasOwnProperty("success")) {

          }
          else {
            if (user.estado == "baja") {
              alert("Tu usuario fue dado de baja ponte en contacto con el administrador");
              localStorage.removeItem("auth_token");
              this.router.navigate(["/"]);
            }
            this.auth = data;
            this.authService.user = data;
            this.loading = false;
          }
        }, err => {
          if (err.code == "401") {
            alert("Token no valido");
          } else {
            alert(err.message);
            console.log(err);
          }
          localStorage.removeItem("auth_token");
          this.router.navigate(["/"]);
        });
      } catch (err: any) {
        console.log(err);
        alert("Se a detectado un posible cambio de token");
        localStorage.removeItem("auth_token");
        this.router.navigate(["/"]);
      }
    }

  }
  ngOnInit(): void {
  }
}

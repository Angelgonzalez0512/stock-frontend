import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any;
  error:string = '';
  loading:boolean = false;
  constructor(public formvalidate:FormBuilder,public authservice:AuthService,public router:Router) {
    if(localStorage.getItem('auth_token')) {
        this.router.navigate(["/admin"]);
        this.loading=true;
    }
    this.form=this.formvalidate.group({
      correo: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]], 
    })
  }  
  ngOnInit(): void {
  }
  login():void{
    if (this.form.valid) {
      this.authservice.login(this.form.value.correo,this.form.value.password).subscribe(data=>{
        console.log(data);
        if(data.success){
          localStorage.setItem("auth_token",encodeURI(JSON.stringify({jwt:data.jwtoken,user:data.data._id})));
          this.authservice.user=data.data;
          this.authservice.user.autenticated=true;
          this.router.navigate(["/admin"]);
        
        }
      });
    } else {
      this.error="complete los datos para continuar"      
    }
  }
}

export class AuthUser {
      autenticated:boolean = false;
      public constructor(
         public _id?: string,
       public nombres?: string,
       public apellidos?: string,
       public dni?: string,
       public area?: string,//
       public cedula?: string,
       public correo?:string,
       public estado?:string,
       public rol?:string 
      ){}
}

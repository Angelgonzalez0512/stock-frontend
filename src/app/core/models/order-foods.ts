import DetailOrder from "./detail-order";
import { User } from "./user";
export class OrderFoods {
    public constructor(
        public _id?:string,
       public codigo?:string,
       public usuario?:User,
       public usuarioid?:string,
       public detalles?:DetailOrder[],
       public transaciones?:any[],
       public area?:string,
       public cedula?:string,
       public fecha?:string,
       public descripcion?:string,
       public otrosproductos?:any[],
       public estado?:string){}
}

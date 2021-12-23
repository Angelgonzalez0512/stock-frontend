import { Product } from "./product";

export class Transaction {
    public constructor(
        public _id?:string,
        public productoid?:string,
        public producto?:Product,
        public codigo?:string,
        public preciounidad?:number,
        public cantidad?:number,
        public factura?:string,
        public area?:string,
        public cedula?:string,
        public fecha?:string,
        public descripcion?:string,
        public tipo?:string
    ){}
}

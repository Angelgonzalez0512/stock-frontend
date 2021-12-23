import { Category } from "./category";

export class Product {
  public constructor(
    public _id?: string,
    public codigo?: string,
    public nombre?: string,
    public precio?: number,
    public cantidad?: number,
    public categoria?:string,
    public unidad?: string,
    public estado?: string
  ) {}
}

import { OrderDetail } from "./orderDetail";

export interface Order
{
custid:number,
empid:number,
orderdate:Date,
requireddate :Date,
shippeddate:Date,
shipperid:number,
freight:number,
shipname:string,
shipaddress:string,
shipcity:string,
shipregion:string,
shippostalcode:string,
shipcountry:string,
orderdetail:OrderDetail
}
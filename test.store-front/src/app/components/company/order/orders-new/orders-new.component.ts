import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InternalResponse } from 'src/app/models/internalResponse';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/orderDetail';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.scss']
})
export class OrdersNewComponent implements OnInit {

  @Input() idRegister: any;

  listEmployee:any[]=[];
  listShipper:any[]=[];
  listProduct:Product[]=[]
  formOrder: FormGroup = new FormGroup({});
  dayToday: Date = new Date();
  unitprice : number =0;
  constructor(   
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService) 
    { 
      this.buildFormOrder() ;
    }

    get g() {
      return this.formOrder.controls;
    }

    private buildFormOrder() {
      this.formOrder = this.fb.group({
        ID_EMPLOYEE: ['', [Validators.required]],
        ID_SHIPPER: ['', [Validators.required]],
        SHIP_NAME: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        SHIP_ADDRESS: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        SHIP_CITY: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        SHIP_COUNTRY: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        ORDER_DATE: ['', [Validators.required]],
        REQUIRED_DATE: ['', [Validators.required]],
        SHIPPED_DATE: ['', [Validators.required]],
        FREIGHT: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        ID_PRODUCT:['', [Validators.required]],
        UNITPRICE: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        QUANTITY: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        DISCOUNT: ['0', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      });
    }

  ngOnInit(): void {
    this.getEmployee();
    this.getShipper();
    this.getProduct();
  }


  clearControlReset() {
    this.router.navigate(['/customer-admin']);
  }

  onContinue(event: Event) 
    {
      if (this.formOrder.valid)
        {
          const value = this.formOrder.value;
    
          let orderde: OrderDetail= 
          {
            productid:parseInt(value.ID_PRODUCT),
            unitprice:parseInt(value.UNITPRICE),
            qty:parseInt(value.QUANTITY),
            discount:parseInt(value.DISCOUNT)
          }
    
    
          let data: Order=
      {
        custid:parseInt(this.idRegister.id),
        empid:parseInt(value.ID_EMPLOYEE),
        orderdate:value.ORDER_DATE,
        requireddate :value.REQUIRED_DATE,
        shippeddate:value.SHIPPED_DATE,
        shipperid:parseInt(value.ID_SHIPPER),
        freight:parseInt(value.FREIGHT),
        shipname:value.SHIP_NAME,
        shipaddress:value.SHIP_ADDRESS,
        shipcity:value.SHIP_CITY,
        shipregion:"",
        shippostalcode:"12345",
        shipcountry:value.SHIP_COUNTRY,
        orderdetail: orderde
      }

      this.postOrder(data);
        
        }
        else
        {
          this.formOrder.markAllAsTouched();
        }
    }

  postOrder(order:Order)
  {
    this.api.authorized().subscribe((jwt: InternalResponse) => {
      if (jwt.state) {
        this.api.post(jwt.value, 'Orders', 'postOrder', order).subscribe((ir: InternalResponse) => {
          if (ir.state) {
            this.toastr.success('Create order success', ' Order')
            this.removeValidators(this.formOrder);
            this.formOrder.reset();
            document.getElementById("btnClose2")?.click();
          } else {
            this.toastr.error('err', 'Request Order');
          }
        }, err => {
          console.log(`Orders error: ${err}`);
          this.toastr.error(`${err}`, 'Request Order');
        });
      }
    }, err => { console.log(`Error al generar el token ${err}`); });
  }

  removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key)!.clearValidators();
      form.get(key)!.updateValueAndValidity();
    }
  }
  
    getEmployee() {
      this.api.authorized().subscribe((jwt: InternalResponse) => {
        if (jwt.state) {
          this.api.get(jwt.value, 'Employees', 'getEmployees').subscribe((ir: InternalResponse) => {
            if (ir.state) {
              this.listEmployee = JSON.parse(ir.value);
            }
          }, err => {
            console.log(`getEmployee error: ${err}`);
            document.getElementById("btnModal")?.click();
          });
        }
      }, err => { console.log(`Error al generar el token ${err}`); });
    }

    getShipper() {
      this.api.authorized().subscribe((jwt: InternalResponse) => {
        if (jwt.state) {
          this.api.get(jwt.value, 'Shippers', 'getShippers').subscribe((ir: InternalResponse) => {
            if (ir.state) {
              this.listShipper = JSON.parse(ir.value);
            }
          }, err => {
            console.log(`getShippers error: ${err}`);
            document.getElementById("btnModal")?.click();
          });
        }
      }, err => { console.log(`Error al generar el token ${err}`); });
    }

    getProduct() {
      this.api.authorized().subscribe((jwt: InternalResponse) => {
        if (jwt.state) {
          this.api.get(jwt.value, 'Products', 'getProducts').subscribe((ir: InternalResponse) => {
            if (ir.state) {
              this.listProduct = JSON.parse(ir.value);
            }
          }, err => {
            console.log(`getProducts error: ${err}`);
            document.getElementById("btnModal")?.click();
          });
        }
      }, err => { console.log(`Error al generar el token ${err}`); });
    }

    selectPrice(event:any)
    {
       if (parseInt(event.target.value) >0 )
       {
      let prod : Product = this.listProduct.filter((value: Product) => value.productid ==parseInt(event.target.value))[0];
      this.unitprice =prod.unitprice;
      this.g.UNITPRICE.setValue(this.unitprice);
       } 
    }

    characters(val: any, key: number) {
      var k = val.charCode;
      if (key === 1) { // AphaNumeric
        return ((k >= 65 && k <= 90) || (k >= 97 && k <= 122) || k == 8 || k == 32 || (k >= 48 && k <= 57));
      } else if (key === 2) { // Only Char
        return ((k >= 65 && k <= 90) || (k >= 97 && k <= 122) || k == 8 || k == 32);
      } else if (key === 3) { // Only Numbers
        return ((k >= 48 && k <= 57) || k == 8);
      } else if (key === 4) { // Email
        if (k === 64)
          return (
            k == 8 // Space
            || (k >= 65 && k <= 90) // Mayuscule
            || (k >= 97 && k <= 122) // Minuscule
            || (k >= 48 && k <= 57) // Numbers
            // || k == 44 // ,
            || k == 45 // -
            || k == 46 // .
            // || k == 59 // ;
            || k == 95 // _
            || k == 64 // @
          );
      } else if (key === 5) { // Pets
        return ((k >= 65 && k <= 90) || (k >= 97 && k <= 122) || k == 8 || k == 44);
      }
      else {
        return k;
      }
    }
}

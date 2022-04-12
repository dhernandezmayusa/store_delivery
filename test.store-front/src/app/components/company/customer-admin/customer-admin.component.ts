import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { E_buttons } from 'src/app/enums/e_buttons';
import { InternalResponse } from 'src/app/models/internalResponse';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-admin',
  templateUrl: './customer-admin.component.html',
  styleUrls: ['./customer-admin.component.scss']
})
export class CustomerAdminComponent implements OnInit {

  listDatatable: any;
  listOriginDataTable: any;
  listButtons: any[] = [];

  formFilter: FormGroup = new FormGroup({});
  listOrders: any;
  IdEdit:any;
  hiddeDatatable: boolean = true;
  hiddeSpinner: boolean = true;

  buscar: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getButtons();
    this.search();
  }


  private getButtons() {
    this.listButtons.push(E_buttons.NewOrder);
    this.listButtons.push(E_buttons.viewOrder);
  }



  public search() {
    this.api.authorized().subscribe((jwt: InternalResponse) => {
      if (jwt.state) {

        this.hiddeSpinner = false;
        this.api.get(jwt.value, "Customers", "getCustomers").subscribe((ir: InternalResponse) => {
          if (ir.state) {
            this.hiddeSpinner = true;
            this.listDatatable = JSON.parse(ir.value);
            this.listOriginDataTable = JSON.parse(ir.value);
            this.hiddeDatatable = this.listDatatable.length == 0 ? true : false;
          } else {
            this.toastr.info(`Estado falso: ${ir.msn}`, "Get false");
          }
        }, (err) => {
          this.toastr.warning(`Error: ${err}`, "search");
        });
      }
    }, (err) => {
      this.toastr.error(`Error al generar el token ${err}`, "Token");
    });
  }

  getId(rest: any) {
    switch (rest.event) {
      case "VIEWORDER":
        this.searchOrders(rest.ID);
        break;
        case "NEWORDER":
          this.IdEdit = { id: rest.ID, estate: 0, funtion: undefined };
          document.getElementById("Editmodal")?.click();
          break;
    }
  }

  private searchOrders(result :string) {
    this.api.authorized().subscribe((jwt: InternalResponse) => {
      if (jwt.state) {
        this.api.get(jwt.value, 'Orders', 'getOrdersCodOrder', `codOrder=${parseInt(result)}`).subscribe((ir: InternalResponse) => {
          if (ir.state) {
            this.listOrders = JSON.parse(ir.value);
            document.getElementById("Newmodal")?.click();
          }
        }, err => {
          console.log(`getOrdersCodOrder error: ${err}`);
        });
      }
    }, err => { console.log(`Error al generar el token ${err}`); });
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

  findcharacters(values: any) {
    if (this.listOriginDataTable !== undefined) {
      if (this.listOriginDataTable.length > 0)
        this.find(values);
    }
  }

  find(values: any) {
    let table: any = this.listOriginDataTable;
    let result: any;
    result = table.filter((value: any) => value.CustomerName.toUpperCase().includes(values));
    this.listDatatable = result;
  }
}



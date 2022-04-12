import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { E_buttons } from 'src/app/enums/e_buttons';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {

  @Input() data: any;

  listDatatableOrders: any;
  listOriginDataTableOrders: any;
  listButtons: any[] = [];
  
  formFilter: FormGroup = new FormGroup({});
  IdEdit: any;
  hiddeDatatable: boolean = true;
  hiddeSpinner: boolean = true;
  buscar: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getButtons();
  }

  private getButtons() {
  }


  ngOnChanges() {
    if (this.data !== undefined) {
      this.listDatatableOrders=this.data;
      this.listOriginDataTableOrders=this.data;
      this.hiddeSpinner = true;
      this.hiddeDatatable = this.data.length == 0 ? true : false;
    }
  }

  clearControlReset() {
      this.router.navigate(['/customer-admin']);
    }


}

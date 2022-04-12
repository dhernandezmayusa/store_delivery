import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { E_buttons } from 'src/app/enums/e_buttons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  @Input() data: any;
  @Input() buttos: any;
  @Input() icons: any;
  @Output() idRow = new EventEmitter<any>();

  btns = E_buttons;

  content: string = "";
  PageActual: number = 1;
  OrderV: number = 1;
  CantPorPage: number = 5;
  Flag: boolean = false;
  currentPage = 1;
  pageSizes: any;
  total: any;
  Page = ["5", "10", "20", "30"];

  listHeader: any[] = [];
  listRows: any[] = [];
  listButtons: any[] = [];

  columoption :boolean=false;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pageSizes = this.Page;
  }

  ngOnChanges() {
    if (this.data !== undefined) {
      if (this.data.length == 0) {
        this.toastr.warning('No se encuentran registros', 'Busqueda');
      }
      // Header
      var columnsIn = this.data[0];
      this.listHeader = [];

      if (this.icons !== undefined)
        this.listHeader.push("");

      for (var key in columnsIn) {
        this.listHeader.push(key.replace(/_/g, ' '));
      }

      // Rows
      this.listRows = [];
      this.data.forEach((e: any) => {
        this.listRows.push(Object.values(e));
      });

      this.total = this.data.length;
      this.listButtons = [];
      this.buttos.forEach((element: E_buttons) => {
        switch (element) {
          case "VIEWORDER":
            this.listButtons.push({ "btn": element, "name": "VIEW ORDERS" });
            break;
          case "NEWORDER":
            this.listButtons.push({ "btn": element, "name": "NEW ORDER" });
            break;
        }
      });

      if(this.listButtons.length>0)
      {
        this.columoption =true;
      }
    }
  }

  handlePageSizeChange(event: any) {
    this.CantPorPage = event.target.value;
    this.PageActual = 1;
  }

  getIdRow(ctl: any, btn: string) {
    this.idRow.emit({ 'ID': ctl[0], 'event': btn });
  }


}

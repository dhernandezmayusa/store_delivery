// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectPaginationModule } from 'ngx-select-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from "angular-datatables";
import { NgxPaginationModule } from 'ngx-pagination';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { NgxEditorModule } from "ngx-editor";

//  Components commons
import { TableComponent } from './common/table/table.component';

//  Componentes

import { AppComponent } from './app.component';
import { CustomerAdminComponent } from './components/company/customer-admin/customer-admin.component';
import { OrdersViewComponent } from './components/company/order/orders-view/orders-view.component';
import { OrdersNewComponent } from './components/company/order/orders-new/orders-new.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CustomerAdminComponent,
    OrdersViewComponent,
    OrdersNewComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule,
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
    }),
    DragDropModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    SelectPaginationModule,
    FlexLayoutModule,
    NgxDatatableModule,
    AutocompleteLibModule,
    NgxEditorModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//  Components
import { CustomerAdminComponent } from './components/company/customer-admin/customer-admin.component';


const routes: Routes = [
  { path: 'customer-admin', component: CustomerAdminComponent },
  { path: '**', redirectTo: 'customer-admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
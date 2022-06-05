import { InsertCategoryComponent } from './users/employee/insert-category/insert-category.component';
import { CategoriesComponent } from './users/employee/Categories/categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTypeComponent } from './lookups/ClientType/client-type/client-type.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { ListClientTypeComponent } from './lookups/ClientType/list-client-type/list-client-type.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GovernorateComponent } from './lookups/Governorate/insert-Governorate/insert-Governorate.component';
import { ListGovernorateComponent } from './lookups/Governorate/list-governorate/list-governorate.component';
import { ListCitiesComponent } from './lookups/Cities/list-cities/list-cities.component';
import { InsertCitiesComponent } from './lookups/Cities/insert-cities/insert-cities.component';
import { CallReasonComponent } from './lookups/CallReason/CallReason/CallReason.component';
import { InsertCallReasonComponent } from './lookups/CallReason/InsertCallReason/InsertCallReason.component';
import { SourceMarketComponent } from './lookups/SourceMarketing/source-market/source-market.component';
import { InsertSourceMarketComponent } from './lookups/SourceMarketing/insert-source-market/insert-source-market.component';
import { ClientComponent } from './users/clients/Client/Client.component';
import { InsertClientComponent } from './users/clients/InsertImageReference/InsertClient.component';
import { RouterModule } from '@angular/router';

import { CustomerServiceComponent } from './users/Customer-Service/customer-service/customer-service.component';
import { InsertCustomerServiceComponent } from './users/Customer-Service/InsertCustomerService/InsertCustomerService.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClientAgentComponent } from './Reports/client-agent/client-agent.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { ClientsComponent } from './Reports/clients/clients.component';
import { ClientCallComponent } from './Reports/client-call/client-call.component';
import { ClientCallDetailsComponent } from './Reports/client-call-details/client-call-details.component';



@NgModule({
  declarations: [
    ClientTypeComponent,
    ListClientTypeComponent,
    GovernorateComponent,
    ListGovernorateComponent,
    ListCitiesComponent,
    InsertCitiesComponent,
    CallReasonComponent,
    InsertCallReasonComponent,
    SourceMarketComponent,
    InsertSourceMarketComponent,
    ClientComponent,
    InsertClientComponent,
    CategoriesComponent,
    InsertCategoryComponent,
    CustomerServiceComponent,
    InsertCustomerServiceComponent,
    ClientAgentComponent,
    ClientsComponent,
    ClientCallComponent,
    ClientCallDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    RouterModule,
    NgxPrintElementModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[ClientTypeComponent]
})
export class AdminModule { }

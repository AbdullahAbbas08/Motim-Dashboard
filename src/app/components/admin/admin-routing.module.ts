import { CategoriesComponent } from './users/employee/Categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientTypeComponent } from './lookups/ClientType/client-type/client-type.component';
import { GovernorateComponent } from './lookups/Governorate/insert-Governorate/insert-Governorate.component';
import { ListClientTypeComponent } from './lookups/ClientType/list-client-type/list-client-type.component';
import { ListGovernorateComponent } from './lookups/Governorate/list-governorate/list-governorate.component';
import { InsertCitiesComponent } from './lookups/Cities/insert-cities/insert-cities.component';
import { ListCitiesComponent } from './lookups/Cities/list-cities/list-cities.component';
import { CallReasonComponent } from './lookups/CallReason/CallReason/CallReason.component';
import { InsertCallReasonComponent } from './lookups/CallReason/InsertCallReason/InsertCallReason.component';
import { SourceMarketComponent } from './lookups/SourceMarketing/source-market/source-market.component';
import { InsertSourceMarketComponent } from './lookups/SourceMarketing/insert-source-market/insert-source-market.component';
import { ClientComponent } from './users/clients/Client/Client.component';
import { InsertClientComponent } from './users/clients/InsertImageReference/InsertClient.component';

import { InsertCustomerServiceComponent } from './users/Customer-Service/InsertCustomerService/InsertCustomerService.component';
import { CustomerServiceComponent } from './users/Customer-Service/customer-service/customer-service.component';
import { ClientAgentComponent } from './Reports/client-agent/client-agent.component';
import { ClientsComponent } from './Reports/clients/clients.component';
import { ClientCallComponent } from './Reports/client-call/client-call.component';
import { ClientCallDetailsComponent } from './Reports/client-call-details/client-call-details.component';
import { InsertCategoryComponent } from './users/employee/insert-category/insert-category.component';
import { GroupsComponent } from './lookups/Group/groups/groups.component';
import { InsertGroupComponent } from './lookups/Group/insert-group/insert-group.component';
import { DepartmentsComponent } from './lookups/ServiceProvider/Service-Provider/service-provider.component';
import { InsertDepartmentComponent } from './lookups/ServiceProvider/insert-Service-Provider/insert-service-provider.component';

const routes: Routes = [
  {
    path: '',children:[
      {
        path:'client-agent-report', component: ClientAgentComponent
      },
      {
        path:'client-report', component: ClientsComponent
      },
      {
        path:'client-call-report', component: ClientCallComponent
      },
      {
        path:'client-call-detail', component: ClientCallDetailsComponent
      },
      {
        path:'client-type', component: ClientTypeComponent
      },
      {
        path:'Get-client-type', component: ListClientTypeComponent
      },
      {
        path:'update-client-type/:id', component: ClientTypeComponent
      },
      {
        path:'insert-governorate', component: GovernorateComponent
      },
      {
        path:'update-governorate/:id', component: GovernorateComponent
      },
      {
        path:'Get-governorate', component: ListGovernorateComponent
      },
      {
        path:'Get-cities', component: ListCitiesComponent
      },
      {
        path:'insert-city', component: InsertCitiesComponent
      },
      {
        path:'update-city/:id', component: InsertCitiesComponent
      },
      {
        path:'insert-call-reason', component: InsertCallReasonComponent
      },
      {
        path:'update-call-reason/:id', component: InsertCallReasonComponent
      },
      {
        path:'Get-Call-Reason', component: CallReasonComponent
      },
      {
        path:'InsertSourceMarket', component: InsertSourceMarketComponent
      },
      {
        path:'updateSourceMarket/:id', component: InsertSourceMarketComponent
      },
      {
        path:'GetSourceMarket', component: SourceMarketComponent
      },
      {
        path:'GetClient', component: ClientComponent
      },
      {
        path:'InsertClient', component: InsertClientComponent
      },
      {
        path:'updateClient/:id', component: InsertClientComponent
      },
      {
        path:'GetCategories', component: CategoriesComponent
      },
      {
        path:'InsertCategory', component: InsertCategoryComponent
      },
      {
        path:'updateCategory/:id', component: InsertCategoryComponent
      },
      {
        path:'GetCustomerService', component: CustomerServiceComponent
      },
      {
        path:'Groups', component: GroupsComponent
      },
      {
        path:'InsertGroup', component: InsertGroupComponent
      },
      {
        path:'InsertGroup/:id', component: InsertGroupComponent
      },
      {
        path:'Department', component: DepartmentsComponent
      },
      {
        path:'Insertserviceprovider', component: InsertDepartmentComponent
      },
      {
        path:'Insertserviceprovider/:id', component: InsertDepartmentComponent
      },
      {
        path:'updateCustomerService/:id', component: InsertCustomerServiceComponent
      },
      
      {
        path:'InsertCustomerService', component: InsertCustomerServiceComponent
      },
     
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule { }

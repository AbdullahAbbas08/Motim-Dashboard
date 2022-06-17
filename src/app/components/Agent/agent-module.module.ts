import { CommonModule } from "@angular/common";
import { AgentRoutingModule } from "./agent-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from "@angular/router";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgModule } from "@angular/core";
import { StatisticsAgentComponent } from './statistics-agent/statistics-agent.component';
import { DealWithCustomerComponent } from './deal-with-customer/deal-with-customer.component';
import { DisplayCustomerDataComponent } from './display-customer-data/display-customer-data.component';




@NgModule({
  declarations: [
   
  
    StatisticsAgentComponent,
            DealWithCustomerComponent,
            DisplayCustomerDataComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    SharedModule,
    ArchwizardModule,
    SweetAlert2Module,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports:[]
})
export class AgentModuleModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { DealWithCustomerComponent } from './deal-with-customer/deal-with-customer.component';
import { DisplayCustomerDataComponent } from './display-customer-data/display-customer-data.component';
import { StatisticsAgentComponent } from './statistics-agent/statistics-agent.component';

const routes: Routes = [
  {
    path: '',children:[
      {
        path:'main', component: AgentComponent
      },
      {
        path:'stat', component: StatisticsAgentComponent
      },
      {
        path:'Customer', component: DealWithCustomerComponent
      },
      {
        path:'Customer/:id', component: DealWithCustomerComponent
      },
      {
        path:'DisplayData/:id', component: DisplayCustomerDataComponent
      },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]

})
export class AgentRoutingModule { }

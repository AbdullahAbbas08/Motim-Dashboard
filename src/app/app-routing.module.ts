import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { SampleComponent } from './components/sample/sample.component';
import { ServiceRequestComponent } from './components/service-request/service-request.component';
import { TabsetComponent } from './components/tabset/tabset.component';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { content } from "./shared/routes/routes";
import { LoginGuardService } from './shared/services/Loginguard.service';
import { ServiceproviderService } from './shared/services/serviceprovider.service';


const routes: Routes = [

  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'chat',
    component:ChatComponent
  },
  {
    canActivate: [ServiceproviderService],
    path: 'ServiceRequest',
    component:ServiceRequestComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  // canActivate: [LoginGuardService],
  { 
    path: 'content',
    component: ContentComponent,
    children: content
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
}) ],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { content } from "./shared/routes/routes";
import { LoginGuardService } from './shared/services/Loginguard.service';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'sample-page',
  //   // pathMatch: 'full'
  // },
  {
    path: '',
    component:LoginComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  { canActivate: [LoginGuardService],
    path: 'content',
    component: ContentComponent,
    children: content
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
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

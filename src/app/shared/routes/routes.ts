import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'sample-page',
    loadChildren: () => import('../../components/sample/sample.module').then(m => m.SampleModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../../components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'agent',
    loadChildren: () => import('../../components/Agent/agent-module.module').then(m => m.AgentModuleModule)
  },
];

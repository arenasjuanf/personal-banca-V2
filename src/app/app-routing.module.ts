import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesPage } from './pages/folder.page';

const routes: Routes = [

  {
    path: 'pages',
    component: PagesPage,
    children:[
      {
        path:'',
        loadChildren: () => import('./pages/folder.module').then( m => m.PagesPageModule)
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

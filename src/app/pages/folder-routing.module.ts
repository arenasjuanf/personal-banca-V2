import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarPage } from './agregar/agregar.page';
import { PagesPage } from './folder.page';


const routes: Routes = [
  {
    path: '',
    component: PagesPage,
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ahorros',
    loadChildren: () => import('./ahorros/ahorros.module').then( m => m.AhorrosPageModule)
  },
  {
    path: 'ahorros/:create',
    loadChildren: () => import('./ahorros/ahorros.module').then( m => m.AhorrosPageModule)
  },
  {
    path: 'deudas',
    loadChildren: () => import('./deudas/deudas.module').then( m => m.DeudasPageModule)
  },
  {
    path: 'deudas/:create',
    loadChildren: () => import('./deudas/deudas.module').then( m => m.DeudasPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}

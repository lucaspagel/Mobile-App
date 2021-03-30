import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'cadernos', pathMatch: 'full' },
 
    { path: 'cadernos', loadChildren: () => import('./cadernos/cadernos.module').then( m => m.CadernosPageModule) },
    { path: 'cadernos/paginas/:id', loadChildren: () => import('./paginas/paginas.module').then( m => m.PaginasPageModule) },
    { path: 'cadernos/paginas/:id/canvas/:id', loadChildren: () => import('./canvas/canvas.module').then(m => m.CanvasPageModule) },
  {
    path: 'canvas',
    loadChildren: () => import('./canvas/canvas.module').then( m => m.CanvasPageModule)
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

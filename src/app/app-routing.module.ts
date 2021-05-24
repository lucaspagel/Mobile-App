import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'cadernos', loadChildren: () => import('./cadernos/cadernos.module').then(m => m.CadernosPageModule), canActivate: [AuthGuard] },
    { path: 'cadernos/paginas/:id', loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasPageModule), canActivate: [AuthGuard] },
    { path: 'cadernos/paginas/:id/canvas/:id', loadChildren: () => import('./canvas/canvas.module').then(m => m.CanvasPageModule), canActivate: [AuthGuard] },
    { path: 'canvas', loadChildren: () => import('./canvas/canvas.module').then(m => m.CanvasPageModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [LoginGuard] },
  {
    path: 'novo-caderno',
    loadChildren: () => import('./novo-caderno/novo-caderno.module').then( m => m.NovoCadernoPageModule)
  }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

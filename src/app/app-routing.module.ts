import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/on-boarding/type', pathMatch: 'full' },
  { path: 'on-boarding', loadChildren: () => import('./modules/on-boarding/on-boarding.module').then(m => m.OnboardingModule) },
  {
    path: 'dashboard',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

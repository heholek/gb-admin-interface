import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth.guard';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule',
  },
  {
    path: 'auth',
    loadChildren: './@auth/auth.module#AuthModule',
  },
  // { path: '', redirectTo: 'landing-', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

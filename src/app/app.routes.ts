import { Routes } from '@angular/router';
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentication/login'
  }, {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () => import("./layouts/auth-layout/auth-layout.routes").then(m => m.authLayoutRoutes)
  }, {
    path: 'administration',
    component: AdminLayoutComponent,
    loadChildren: () => import("./layouts/admin-layout/admin-layout.routes").then(m => m.adminLayoutRoutes)
  }, {
    path: '**',
    redirectTo: ''
  }
];

import { Routes } from "@angular/router";

export const authLayoutRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import("../../pages/login/login.component").then(c => c.LoginComponent)
  }, {
    path: 'register',
    loadComponent: () => import("../../pages/register/register.component").then(c => c.RegisterComponent)
  }
];

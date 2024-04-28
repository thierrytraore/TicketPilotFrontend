import { Routes } from "@angular/router";

export const adminLayoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import("../../pages/dashboard/dashboard.component").then(c => c.DashboardComponent)
  }
];

import { Routes } from "@angular/router";

export const adminLayoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
  }, {
    path: 'ticket',
    loadComponent: () => import('../../pages/ticket/ticket.component').then(c => c.TicketComponent)
  }
];

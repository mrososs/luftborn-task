import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // App shell — loads the layout component (header + sidebar + content area)
    loadComponent: () => import('./app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

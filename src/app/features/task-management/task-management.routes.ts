import { Routes } from '@angular/router';

export const TASK_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/task-list-page/task-list-page.component').then(
        (m) => m.TaskListPageComponent,
      ),
  },
];

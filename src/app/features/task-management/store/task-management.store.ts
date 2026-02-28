import { Injectable, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { Task, TaskFilters } from '../../../models/task.model';
import { PaginatedResponse, PaginationParams } from '../../../models/api-response.model';

/**
 * Signal-based store for the Task Management feature.
 * Manages tasks list, filters, pagination, and CRUD loading states.
 */
@Injectable()
export class TaskManagementStore {
  /** Active filters controlling the task list query */
  readonly filters = signal<TaskFilters>({});

  /** Current pagination state */
  readonly pagination = signal<PaginationParams>({ page: 1, pageSize: 10 });

  /** httpResource that re-fetches whenever filters or pagination signals change */
  private readonly tasksResource = httpResource<PaginatedResponse<Task>>(() => {
    const f = this.filters();
    const p = this.pagination();
    const params = new URLSearchParams({
      page: String(p.page),
      pageSize: String(p.pageSize),
      ...(f.search ? { search: f.search } : {}),
      ...(f.status ? { status: f.status } : {}),
      ...(f.priority ? { priority: f.priority } : {}),
    });
    return `/api/tasks?${params}`;
  });

  /** The resolved task array */
  readonly tasks = computed<Task[]>(() => this.tasksResource.value()?.data ?? []);

  /** Total task count for pagination */
  readonly total = computed<number>(() => this.tasksResource.value()?.total ?? 0);

  readonly isLoading = this.tasksResource.isLoading;
  readonly error = this.tasksResource.error;

  /**
   * Updates the active filters and resets pagination to page 1.
   * The httpResource auto-re-fetches when filters signal changes.
   */
  updateFilters(filters: TaskFilters): void {
    this.filters.set(filters);
    this.pagination.update((p) => ({ ...p, page: 1 }));
  }

  /** Navigates to a specific page */
  setPage(page: number): void {
    this.pagination.update((p) => ({ ...p, page }));
  }
}

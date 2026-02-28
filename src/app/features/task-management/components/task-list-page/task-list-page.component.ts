import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskManagementStore } from '../../store/task-management.store';
import { TaskFiltersComponent } from '../task-filters/task-filters.component';
import { TaskTableComponent } from '../task-table/task-table.component';
import { SkeletonTableComponent } from '../../../../shared/components/skeleton/skeleton-table.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { TaskFilters, Task } from '../../../../models/task.model';

/**
 * Task Management page (Smart / Container Component).
 * Orchestrates the store, opens dialogs, and passes data to presentational children.
 */
@Component({
  selector: 'app-task-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TaskFiltersComponent,
    TaskTableComponent,
    SkeletonTableComponent,
    CustomButtonComponent,
  ],
  providers: [TaskManagementStore],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss',
})
export class TaskListPageComponent {
  protected readonly store = inject(TaskManagementStore);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  /** Opens the Create Task dialog */
  protected openCreateDialog(): void {
    import('../task-create-dialog/task-create-dialog.component').then(
      ({ TaskCreateDialogComponent }) => {
        this.dialog
          .open(TaskCreateDialogComponent, { width: '540px' })
          .afterClosed()
          .subscribe((created) => {
            if (created) {
              this.snackBar.open('Task created successfully!', 'OK', { duration: 3000 });
            }
          });
      },
    );
  }

  /** Opens the Task Detail / Edit dialog */
  protected openDetailDialog(task: Task): void {
    import('../task-detail-dialog/task-detail-dialog.component').then(
      ({ TaskDetailDialogComponent }) => {
        this.dialog.open(TaskDetailDialogComponent, {
          width: '640px',
          data: task,
        });
      },
    );
  }

  protected onFiltersChange(filters: TaskFilters): void {
    this.store.updateFilters(filters);
  }

  protected onPageChange(page: number): void {
    this.store.setPage(page);
  }
}

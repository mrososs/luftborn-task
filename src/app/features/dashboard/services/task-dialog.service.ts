import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KanbanBoardStore } from '../store/kanban-board.store';

/**
 * Shared service for opening the Add Task dialog.
 * This allows both the Sidebar and the Kanban board components (or any other)
 * to trigger the same task creation flow.
 */
@Injectable({ providedIn: 'root' })
export class TaskDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly store = inject(KanbanBoardStore);

  /**
   * Opens the Add Task dialog and handles the result.
   */
  openAddTaskDialog(): void {
    import('../components/kanban-board/kanban-add-task-dialog/kanban-add-task-dialog.component').then(
      ({ KanbanAddTaskDialogComponent }) => {
        this.dialog
          .open(KanbanAddTaskDialogComponent, { width: '480px', disableClose: false })
          .afterClosed()
          .subscribe((payload) => {
            if (payload) {
              this.store.addTask(payload);
              this.snackBar.open('✅ Task created successfully!', 'OK', { duration: 3000 });
            }
          });
      },
    );
  }
}

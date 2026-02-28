import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { KanbanBoardStore, KanbanColumn, KanbanTask } from '../../store/kanban-board.store';
import { KanbanColumnComponent } from './kanban-column/kanban-column.component';
import { TaskDialogService } from '../../services/task-dialog.service';

/**
 * Kanban board (Smart Component).
 * Manages the 3-column CDK drag-and-drop board and delegates to KanbanBoardStore (signalStore).
 */
@Component({
  selector: 'app-kanban-board',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KanbanColumnComponent, MatIconModule, CdkDropListGroup],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  protected readonly store = inject(KanbanBoardStore);
  private readonly taskDialogService = inject(TaskDialogService);

  /** Active board filter passed from the dashboard page */
  readonly activeFilter = input<string>('all');

  /** Emitted so parent (DashboardPage) can show stats derived from store counts */
  readonly statsUpdated = output<void>();

  /** CDK drop list IDs for cross-column connection */
  protected readonly columnIds: KanbanColumn[] = ['todo', 'in-progress', 'done'];

  readonly columnConfig: { id: KanbanColumn; label: string }[] = [
    { id: 'todo', label: 'TO DO' },
    { id: 'in-progress', label: 'IN PROGRESS' },
    { id: 'done', label: 'DONE' },
  ];

  /** Returns tasks for the given column from the store */
  protected getTasksForColumn(col: KanbanColumn): KanbanTask[] {
    if (col === 'todo') return this.store.todoTasks();
    if (col === 'in-progress') return this.store.inProgressTasks();
    return this.store.doneTasks();
  }

  /** Returns all column IDs except the given one (for cdkDropListConnectedTo) */
  protected getConnectedIds(currentId: KanbanColumn): string[] {
    return this.columnIds.filter((id) => id !== currentId);
  }

  /**
   * Handles the CDK drop event.
   * Differentiates between same-column reorder and cross-column transfer.
   */
  protected onDrop(event: CdkDragDrop<KanbanTask[]>, targetColumn: KanbanColumn): void {
    const sourceColumn = event.previousContainer.id as KanbanColumn;
    this.store.moveTask(sourceColumn, targetColumn, event.previousIndex, event.currentIndex);
  }

  /**
   * Opens the Add Task dialog using the shared service.
   */
  openAddTaskDialog(): void {
    this.taskDialogService.openAddTaskDialog();
  }
}

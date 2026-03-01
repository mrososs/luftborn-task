import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StatsOverviewComponent } from '../stats-overview/stats-overview.component';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { KanbanBoardStore } from '../../store/kanban-board.store';
import { TaskPriority } from '../../../../models/task.model';

/** Active filter tab type */
export type BoardFilter = 'all' | 'todo' | 'in-progress' | 'done';

/**
 * Dashboard page (Smart / Container Component).
 * Renders the static stat cards row, filter tabs, and the Kanban board.
 */
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StatsOverviewComponent,
    KanbanBoardComponent,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  protected readonly store = inject(KanbanBoardStore);

  /** Reference to the kanban board for opening the add-task dialog */
  @ViewChild(KanbanBoardComponent) protected kanbanBoard?: KanbanBoardComponent;

  protected readonly filterTabs: { value: BoardFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  /** Updates the active filter */
  protected onFilterChange(filter: BoardFilter): void {
    this.store.setFilter(filter);
  }

  protected readonly priorityOptions: { value: TaskPriority | ''; label: string }[] = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  /** Updates the priority filter */
  protected onPriorityChange(priority: TaskPriority | ''): void {
    this.store.setPriorityFilter(priority === '' ? null : priority);
  }

  /** Delegates to the kanban board to open the add-task dialog */
  protected openAddTaskDialog(): void {
    this.kanbanBoard?.openAddTaskDialog();
  }
}

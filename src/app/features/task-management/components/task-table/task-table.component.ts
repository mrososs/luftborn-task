import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Task } from '../../../../models/task.model';
import { TaskStatusPipe } from '../../../../shared/pipes/task-status.pipe';
import { PriorityLabelPipe } from '../../../../shared/pipes/priority-label.pipe';

/**
 * Task data table (Presentational).
 * Renders a sortable, paginated Material table for the task list.
 * Maps to the Figma Main > Container (large scrollable table area).
 */
@Component({
  selector: 'app-task-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    TaskStatusPipe,
    PriorityLabelPipe,
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
})
export class TaskTableComponent {
  readonly tasks = input.required<Task[]>();
  readonly total = input<number>(0);
  readonly currentPage = input<number>(1);
  readonly pageSize = input<number>(10);

  /** Emitted when user clicks a table row */
  readonly taskSelected = output<Task>();
  /** Emitted when paginator page changes */
  readonly pageChange = output<number>();

  protected readonly displayedColumns = [
    'title',
    'status',
    'priority',
    'assigneeId',
    'dueDate',
    'actions',
  ];

  protected onRowClick(task: Task): void {
    this.taskSelected.emit(task);
  }

  protected onPageEvent(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex + 1);
  }
}

import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { KanbanTask } from '../../../store/kanban-board.store';

/**
 * Task card (Presentational).
 * Displays task data with priority badge, assignee avatar, tags, and due date.
 * Matches the Figma Task Card component including hover state animations.
 */
@Component({
  selector: 'app-task-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, UpperCasePipe, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  /** The task data to render */
  readonly task = input.required<KanbanTask>();

  /** Emitted when edit action is chosen */
  readonly editRequested = output<KanbanTask>();

  /** Emitted when delete action is chosen */
  readonly deleteRequested = output<string>();

  /** True if the task's due date is in the past and it's not done */
  readonly isOverdue = computed<boolean>(() => {
    const t = this.task();
    if (!t.dueDate || t.status === 'done') return false;
    const now = new Date().toISOString().split('T')[0];
    return t.dueDate < now;
  });
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
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
  imports: [DatePipe, UpperCasePipe, MatIconModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  /** The task data to render */
  readonly task = input.required<KanbanTask>();

  /** True if the task's due date is in the past and it's not done */
  readonly isOverdue = computed<boolean>(() => {
    const t = this.task();
    if (!t.dueDate || t.status === 'done') return false;
    const now = new Date().toISOString().split('T')[0];
    return t.dueDate < now;
  });
}

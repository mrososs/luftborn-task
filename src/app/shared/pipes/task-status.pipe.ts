import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../models/task.model';

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

/**
 * Transforms a TaskStatus key into a human-readable label.
 * Usage: {{ task.status | taskStatus }}
 */
@Pipe({ name: 'taskStatus', standalone: true, pure: true })
export class TaskStatusPipe implements PipeTransform {
  transform(status: TaskStatus): string {
    return STATUS_LABELS[status] ?? status;
  }
}

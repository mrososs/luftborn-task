import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../models/task.model';

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

/**
 * Transforms a TaskPriority key into a readable label.
 * Usage: {{ task.priority | priorityLabel }}
 */
@Pipe({ name: 'priorityLabel', standalone: true, pure: true })
export class PriorityLabelPipe implements PipeTransform {
  transform(priority: TaskPriority): string {
    return PRIORITY_LABELS[priority] ?? priority;
  }
}

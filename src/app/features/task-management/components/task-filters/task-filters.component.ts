import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { TaskFilters, TaskStatus, TaskPriority } from '../../../../models/task.model';

/**
 * Task filters toolbar (Presentational).
 * Maps to the Figma Main > Background+Shadow toolbar panel.
 * Emits filter changes upward for the smart component to update the store.
 */
@Component({
  selector: 'app-task-filters',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    SearchInputComponent,
    CustomButtonComponent,
  ],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.scss',
})
export class TaskFiltersComponent {
  readonly filters = input<TaskFilters>({});

  /** Emits updated filters when Apply is clicked */
  readonly filtersChange = output<TaskFilters>();

  protected readonly statusOptions: { value: TaskStatus | ''; label: string }[] = [
    { value: '', label: 'All Statuses' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  protected readonly priorityOptions: { value: TaskPriority | ''; label: string }[] = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  private currentSearch = '';
  private currentStatus: TaskStatus | '' = '';
  private currentPriority: TaskPriority | '' = '';

  protected onSearchChange(search: string): void {
    this.currentSearch = search;
  }

  protected onStatusChange(status: TaskStatus | ''): void {
    this.currentStatus = status;
  }

  protected onPriorityChange(priority: TaskPriority | ''): void {
    this.currentPriority = priority;
  }

  protected applyFilters(): void {
    this.filtersChange.emit({
      search: this.currentSearch,
      status: this.currentStatus,
      priority: this.currentPriority,
    });
  }

  protected resetFilters(): void {
    this.currentSearch = '';
    this.currentStatus = '';
    this.currentPriority = '';
    this.filtersChange.emit({});
  }
}

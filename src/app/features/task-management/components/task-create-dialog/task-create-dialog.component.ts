import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskStatus, TaskPriority } from '../../../../models/task.model';

/**
 * Create Task dialog (no direct store injection — emits payload via MatDialogRef).
 */
@Component({
  selector: 'app-task-create-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.scss',
})
export class TaskCreateDialogComponent {
  protected readonly form: FormGroup;

  protected readonly statusOptions: TaskStatus[] = ['todo', 'in-progress', 'done', 'cancelled'];
  protected readonly priorityOptions: TaskPriority[] = ['low', 'medium', 'high', 'critical'];
  private readonly fb = inject(FormBuilder);
  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['todo' as TaskStatus, Validators.required],
      priority: ['medium' as TaskPriority, Validators.required],
      dueDate: [''],
    });
  }

  protected get titleError(): string | null {
    const ctrl = this.form.get('title');
    if (ctrl?.hasError('required')) return 'Title is required.';
    if (ctrl?.hasError('minlength')) return 'Title must be at least 3 characters.';
    return null;
  }
}

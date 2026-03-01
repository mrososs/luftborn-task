import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from '../../../../../models/task.model';
import { KanbanTask } from '../../../store/kanban-board.store';

export interface KanbanTaskPayload {
  title: string;
  description: string;
  priority: TaskPriority;
  assigneeName: string;
}

/**
 * Add Task dialog for the Kanban board.
 * On submit emits a KanbanTaskPayload back to the parent via MatDialogRef.
 */
@Component({
  selector: 'app-kanban-add-task-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './kanban-add-task-dialog.component.html',
  styleUrl: './kanban-add-task-dialog.component.scss',
})
export class KanbanAddTaskDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<KanbanAddTaskDialogComponent>);
  private readonly data = inject<{ task?: KanbanTask }>(MAT_DIALOG_DATA, { optional: true });
  private readonly fb = inject(FormBuilder);

  protected readonly isEditMode = !!this.data?.task;

  protected readonly form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    priority: ['medium' as TaskPriority, Validators.required],
    assigneeName: [''],
  });

  ngOnInit(): void {
    if (this.data?.task) {
      this.form.patchValue({
        title: this.data.task.title,
        description: this.data.task.description,
        priority: this.data.task.priority,
        assigneeName: this.data.task.assigneeName,
      });
    }
  }

  protected readonly priorityOptions: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  /** Returns the title field error message */
  protected get titleError(): string | null {
    const ctrl = this.form.get('title');
    if (ctrl?.hasError('required')) return 'Title is required.';
    if (ctrl?.hasError('minlength')) return 'Title must be at least 3 characters.';
    return null;
  }

  /** Submits the form and closes the dialog with the payload */
  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: KanbanTaskPayload = this.form.getRawValue();
    this.dialogRef.close(payload);
  }

  /** Dismisses the dialog without saving */
  protected onCancel(): void {
    this.dialogRef.close(null);
  }
}

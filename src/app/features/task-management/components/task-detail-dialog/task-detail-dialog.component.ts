import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Task } from '../../../../models/task.model';
import { TaskStatusPipe } from '../../../../shared/pipes/task-status.pipe';
import { PriorityLabelPipe } from '../../../../shared/pipes/priority-label.pipe';

/**
 * Task detail view dialog (Presentational).
 * Receives a Task object via MAT_DIALOG_DATA and displays all its fields.
 */
@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    TaskStatusPipe,
    PriorityLabelPipe,
  ],
  templateUrl: './task-detail-dialog.component.html',
  styleUrl: './task-detail-dialog.component.scss',
})
export class TaskDetailDialogComponent {
  /** The task injected from the smart component via MatDialog.open({ data: task }) */
  protected readonly task = inject<Task>(MAT_DIALOG_DATA);
}

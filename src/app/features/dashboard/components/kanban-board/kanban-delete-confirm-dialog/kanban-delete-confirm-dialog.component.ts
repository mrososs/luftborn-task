import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Simple confirmation dialog for deleting a task.
 */
@Component({
  selector: 'app-kanban-delete-confirm-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title class="flex items-center gap-2 text-danger font-bold px-6 pt-5 pb-2 m-0">
      Delete Task
    </h2>
    <mat-dialog-content class="px-6 py-2 text-[#374151]">
      Are you sure you want to delete this task? This action cannot be undone.
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="px-6 pt-2 pb-5 gap-3">
      <button mat-stroked-button (click)="onCancel()" class="border-[#d1d5db]">Cancel</button>
      <button mat-flat-button color="warn" (click)="onConfirm()" class="bg-[#E5484D] text-white">
        Delete
      </button>
    </mat-dialog-actions>
  `,
})
export class KanbanDeleteConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<KanbanDeleteConfirmDialogComponent>);

  protected onCancel(): void {
    this.dialogRef.close(false);
  }

  protected onConfirm(): void {
    this.dialogRef.close(true);
  }
}

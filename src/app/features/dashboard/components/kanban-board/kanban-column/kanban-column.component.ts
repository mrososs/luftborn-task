import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragDrop, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { TaskCardComponent } from '../task-card/task-card.component';
import { KanbanTask, KanbanColumn } from '../../../store/kanban-board.store';

/**
 * Kanban column (Presentational).
 * Renders a column header with count and a CDK drop list of task cards.
 */
@Component({
  selector: 'app-kanban-column',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkDropList, CdkDrag, CdkDragPlaceholder, MatIconModule, TaskCardComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss',
})
export class KanbanColumnComponent {
  /** Column metadata */
  readonly columnId = input.required<KanbanColumn>();
  readonly columnLabel = input.required<string>();
  readonly tasks = input.required<KanbanTask[]>();

  /** IDs of connected drop lists for cross-column drag — kept for compatibility */
  readonly connectedTo = input<string[]>([]);

  /** Emitted when a drop event occurs in this column */
  readonly dropped = output<CdkDragDrop<KanbanTask[]>>();

  /** Emitted when a task within this column requests editing */
  readonly editRequested = output<KanbanTask>();

  /** Emitted when a task within this column requests deletion */
  readonly deleteRequested = output<string>();

  protected onDrop(event: CdkDragDrop<KanbanTask[]>): void {
    this.dropped.emit(event);
  }
}

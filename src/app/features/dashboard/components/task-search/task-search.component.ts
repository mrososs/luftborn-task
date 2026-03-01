import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { KanbanBoardStore } from '../../store/kanban-board.store';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

/**
 * Task search component with debounced RxJS input.
 * Provides a premium search experience for filtering the Kanban board.
 */
@Component({
  selector: 'app-task-search',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.scss',
})
export class TaskSearchComponent implements OnInit, OnDestroy {
  private readonly store = inject(KanbanBoardStore);
  private readonly destroy$ = new Subject<void>();

  /** Form control for the search input */
  protected readonly searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    // Implement debounced search
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.store.setSearchQuery(query);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Clears the search input */
  protected clearSearch(): void {
    this.searchControl.setValue('');
  }
}

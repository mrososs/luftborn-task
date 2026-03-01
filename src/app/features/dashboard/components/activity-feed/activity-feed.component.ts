import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivityStore } from '../../store/activity.store';

/**
 * Presentational component for the recent activity feed.
 */
@Component({
  selector: 'app-activity-feed',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss',
})
export class ActivityFeedComponent {
  protected readonly activityStore = inject(ActivityStore);

  /** Map activity types to Material icons */
  protected readonly iconMap: Record<string, string> = {
    task_created: 'add_circle',
    task_updated: 'edit',
    task_deleted: 'delete_sweep',
    task_moved: 'swap_horiz',
  };

  /** Map activity types to tailwind colors */
  protected readonly colorMap: Record<string, string> = {
    task_created: 'text-emerald-500 bg-emerald-50',
    task_updated: 'text-amber-500 bg-amber-50',
    task_deleted: 'text-rose-500 bg-rose-50',
    task_moved: 'text-indigo-500 bg-indigo-50',
  };
}

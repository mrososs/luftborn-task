import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnalyticsStore } from '../../store/analytics.store';
import { SkeletonCardComponent } from '../../../../shared/components/skeleton/skeleton-card.component';

/**
 * Analytics page (Smart / Container Component).
 * Provides AnalyticsStore and coordinates chart components.
 */
@Component({
  selector: 'app-analytics-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SkeletonCardComponent],
  providers: [AnalyticsStore],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.scss',
})
export class AnalyticsPageComponent {
  protected readonly store = inject(AnalyticsStore);
}

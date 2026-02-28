import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Skeleton table loader displayed while task-management data is fetching.
 * Uses CSS animation for a shimmer effect — no dependencies required.
 */
@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-table" aria-busy="true" aria-label="Loading data...">
      <div class="skeleton-table__header skeleton-row"></div>
      @for (row of rows(); track $index) {
        <div class="skeleton-table__row skeleton-row"></div>
      }
    </div>
  `,
  styles: [
    `
      .skeleton-table {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }
      .skeleton-row {
        height: 44px;
        border-radius: var(--radius-btn);
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
      }
      .skeleton-table__header {
        height: 36px;
      }
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `,
  ],
})
export class SkeletonTableComponent {
  /** Number of skeleton body rows to render */
  readonly rows = input<number[]>([1, 2, 3, 4, 5]);
}

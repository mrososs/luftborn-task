import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Skeleton card loader displayed while dashboard stat cards are fetching.
 * Used in stats-overview before the httpResource resolves.
 */
@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-cards" aria-busy="true" aria-label="Loading...">
      @for (n of count(); track $index) {
        <div class="skeleton-card">
          <div class="skeleton-card__icon skeleton-shimmer"></div>
          <div class="skeleton-card__lines">
            <div class="skeleton-card__line skeleton-card__line--value skeleton-shimmer"></div>
            <div class="skeleton-card__line skeleton-card__line--label skeleton-shimmer"></div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .skeleton-cards {
        display: flex;
        gap: 24px;
      }
      .skeleton-card {
        display: flex;
        gap: 12px;
        align-items: center;
        flex: 1;
        padding: 20px;
        border-radius: var(--radius-card);
        background: var(--color-white);
        box-shadow: var(--shadow-card);
      }
      .skeleton-card__icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .skeleton-card__lines {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }
      .skeleton-card__line {
        border-radius: 4px;
      }
      .skeleton-card__line--value {
        height: 24px;
        width: 60%;
      }
      .skeleton-card__line--label {
        height: 14px;
        width: 80%;
      }
      .skeleton-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
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
export class SkeletonCardComponent {
  /** How many skeleton cards to render */
  readonly count = input<number[]>([1, 2, 3, 4]);
}

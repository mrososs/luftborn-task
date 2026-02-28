import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatCardComponent } from '../../../../shared/components/stat-card/stat-card.component';
import { StatCard } from '../../../../models/stat-card.model';

/**
 * Stats overview row (Presentational).
 * Renders the horizontal array of KPI stat cards from the Figma Main > Container row.
 */
@Component({
  selector: 'app-stats-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatCardComponent],
  templateUrl: './stats-overview.component.html',
  styleUrl: './stats-overview.component.scss',
})
export class StatsOverviewComponent {
  /** Array of KPI stat cards to display */
  readonly stats = input.required<StatCard[]>();
}

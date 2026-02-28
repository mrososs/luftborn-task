import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StatCard } from '../../../models/stat-card.model';

/**
 * KPI summary card (Presentational).
 * Driven by the StatCard model — displayed in a horizontal row at the top of the Dashboard Main area.
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  /** The stat card data object */
  readonly card = input.required<StatCard>();
}

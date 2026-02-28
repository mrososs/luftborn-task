export type TrendDirection = 'up' | 'down' | 'neutral';

/** Drives the KPI summary stat-card presentational component */
export interface StatCard {
  label: string;
  value: number | string;
  /** Material icon name */
  icon?: string;
  trend?: TrendDirection;
  trendPercent?: number;
  /** Accent CSS class applied to the card icon area */
  colorClass?: 'primary' | 'success' | 'warning' | 'danger';
}

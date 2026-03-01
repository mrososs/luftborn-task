import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { KanbanBoardStore } from '../../store/kanban-board.store';

/**
 * Stats overview (Smart Component).
 * Renders a Bar Chart using Chart.js based on Kanban board stats.
 */
@Component({
  selector: 'app-stats-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  templateUrl: './stats-overview.component.html',
  styleUrl: './stats-overview.component.scss',
})
export class StatsOverviewComponent {
  private readonly store = inject(KanbanBoardStore);

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a2e',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 11, weight: 'bold' } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#F3F4F6' },
        ticks: { color: '#6B7280', font: { size: 11 } },
      },
    },
  };

  public barChartType: ChartType = 'bar';

  public barChartData = computed<ChartData<'bar'>>(() => ({
    labels: ['Total Tasks', 'In Progress', 'Completed', 'Overdue'],
    datasets: [
      {
        data: [
          this.store.totalTasks(),
          this.store.inProgressCount(),
          this.store.completedCount(),
          this.store.overdueCount(),
        ],
        backgroundColor: ['#6366F1', '#F59E0B', '#10B981', '#EF4444'],
        borderRadius: 6,
        barThickness: 32,
      },
    ],
  }));
}

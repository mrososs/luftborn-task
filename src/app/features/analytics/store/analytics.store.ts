import { Injectable, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface TaskCompletionData {
  month: string;
  completed: number;
  created: number;
}

export interface PriorityBreakdown {
  priority: string;
  count: number;
}

export interface AnalyticsData {
  completionTrend: TaskCompletionData[];
  priorityBreakdown: PriorityBreakdown[];
  completionRate: number;
  averageCompletionDays: number;
}

/**
 * Signal-based store for the Analytics feature.
 * Fetches aggregate analytics data via httpResource.
 */
@Injectable()
export class AnalyticsStore {
  private readonly analyticsResource = httpResource<AnalyticsData>(() => '/api/analytics');

  readonly data = computed<AnalyticsData | undefined>(() => this.analyticsResource.value());

  readonly completionTrend = computed(() => this.data()?.completionTrend ?? []);

  readonly priorityBreakdown = computed(() => this.data()?.priorityBreakdown ?? []);

  readonly isLoading = this.analyticsResource.isLoading;
  readonly error = this.analyticsResource.error;
}

import { Injectable, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';

import { StatCard } from '../../../models/stat-card.model';
import { ApiResponse } from '../../../models/api-response.model';

/**
 * Signal-based store for the Dashboard feature.
 * Fetches KPI stat cards and exposes loading/error states.
 */
@Injectable()
export class DashboardStore {
  /** httpResource fetching the KPI stats from the API */
  private readonly statsResource = httpResource<ApiResponse<StatCard[]>>(
    () => '/api/dashboard/stats',
  );

  /** The resolved stat cards array (empty while loading) */
  readonly stats = computed<StatCard[]>(() => this.statsResource.value()?.data ?? []);

  /** True while the stats API call is in-flight */
  readonly isLoading = this.statsResource.isLoading;

  /** Error thrown by the stats API call, or undefined */
  readonly error = this.statsResource.error;
}

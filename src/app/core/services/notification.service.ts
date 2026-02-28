import { Injectable, signal } from '@angular/core';

/**
 * Manages the notification bell badge count and panel open/close state.
 * Singleton — provided in root via core.providers.ts.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  /** Number of unread notifications shown in the header badge */
  readonly unreadCount = signal<number>(0);

  /** Whether the notification panel/dropdown is currently open */
  readonly isPanelOpen = signal<boolean>(false);

  /** Marks all notifications as read */
  markAllRead(): void {
    this.unreadCount.set(0);
  }

  /** Increments the badge count by the given amount */
  addNotifications(count: number): void {
    this.unreadCount.update((c) => c + count);
  }

  /** Toggles the notification panel visibility */
  togglePanel(): void {
    this.isPanelOpen.update((open) => !open);
  }
}

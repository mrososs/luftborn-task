import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { SearchInputComponent } from '../search-input/search-input.component';

/**
 * Top application header (Presentational).
 * Maps to the Figma Header frame: logo/brand background, search input, bell icon, user avatar.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule, MatBadgeModule, SearchInputComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly authService = inject(AuthService);
  protected readonly notificationService = inject(NotificationService);

  /** Emitted when the user types in the global search input */
  readonly searchChange = output<string>();

  /** Emitted when the notification bell is clicked */
  readonly notificationClick = output<void>();

  /** Handles search input changes and emits the value */
  protected onSearchChange(query: string): void {
    this.searchChange.emit(query);
  }
}

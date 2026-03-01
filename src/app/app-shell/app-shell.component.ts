import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { NavItem } from '../models/nav-item.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  private readonly router = inject(Router);

  /** Sidebar open state for mobile screens */
  protected readonly isSidebarOpen = signal(false);

  /** Notifications drawer open state */
  protected readonly isNotificationsOpen = signal(false);

  constructor() {
    // Close sidebar automatically when navigating to a new route
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.isSidebarOpen.set(false);
      });
  }

  /** Toggles the mobile sidebar */
  protected toggleSidebar(): void {
    this.isSidebarOpen.update((open) => !open);
  }

  /** Force closes the mobile sidebar */
  protected closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  /** Toggles the notifications drawer */
  protected toggleNotifications(): void {
    this.isNotificationsOpen.update((open) => !open);
  }

  /** Closes all drawers */
  protected closeAll(): void {
    this.isSidebarOpen.set(false);
    this.isNotificationsOpen.set(false);
  }

  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', emoji: '📊', route: '/dashboard', exact: true },
    { label: 'Tasks', emoji: '✅', route: '/dashboard', disabled: true },
    { label: 'Calendar', emoji: '📅', route: '/dashboard', disabled: true },
    { label: 'Analytics', emoji: '📈', route: '/dashboard', disabled: true },
    { label: 'Team', emoji: '👥', route: '/dashboard', disabled: true },
    { label: 'Settings', emoji: '⚙️', route: '/dashboard', disabled: true },
  ];

  protected onSearchChange(query: string): void {
    console.log('Searching for:', query); // كدا الـ Lint هيسكت
    // TODO: implement search
  }

  protected onNotificationClick(): void {
    // TODO: implement notification
  }
}

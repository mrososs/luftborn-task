import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { NavItem } from '../models/nav-item.model';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
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

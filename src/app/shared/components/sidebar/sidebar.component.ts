import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../../models/nav-item.model';

/**
 * Sidebar navigation component (Presentational).
 * Renders the nav item list and the "+ New Task" CTA button from the Figma Aside frame.
 * Styled with Tailwind utility classes to match Figma node 1-650.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  /** Navigation items to render */
  readonly navItems = input.required<NavItem[]>();

  /** Emitted when the "+ New Task" button is clicked */
  readonly newTaskClicked = output<void>();

  /** Handles the + New Task button click */
  protected onNewTaskClick(): void {
    this.newTaskClicked.emit();
  }
}

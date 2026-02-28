/** Represents a single sidebar navigation link */
export interface NavItem {
  label: string;
  /** Emoji icon to display (from Figma design) */
  emoji: string;
  route: string;
  exact?: boolean;
  /** Whether the nav item is active/enabled */
  disabled?: boolean;
  /** Optional badge count, e.g. pending tasks */
  badge?: number;
}

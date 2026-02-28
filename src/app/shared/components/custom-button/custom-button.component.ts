import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'icon';

/**
 * Generic reusable button (Presentational).
 * Maps to Figma Component 1 (variant=1 → icon-only, variant=2 → text CTA like "+ New Task").
 */
@Component({
  selector: 'app-custom-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  readonly label = input<string>('');
  readonly icon = input<string>('');
  readonly variant = input<ButtonVariant>('primary');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /** Emitted on button click (use instead of native click for proper disabled handling) */
  readonly clicked = output<void>();

  protected handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

/**
 * Reusable search input field (Presentational).
 * Maps to the Figma Header > Input frame.
 */
@Component({
  selector: 'app-search-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatIconModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  readonly placeholder = input<string>('Search...');

  /** Emitted on each keystroke */
  readonly searchChange = output<string>();

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}

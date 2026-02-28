---
trigger: always_on
---

Performance Rules
Change Detection: Force changeDetection: ChangeDetectionStrategy.OnPush on all components.

Control Flow: Use exclusively the new @if, @for, and @switch syntax.

Memory Management: Ensure all RxJS subscriptions are handled using takeUntilDestroyed() or the async pipe to prevent memory leaks.

List Optimization: Always provide a track expression in @for loops to optimize DOM re-rendering.

Lazy Loading: Implement lazy loading for all feature routes to optimize initial bundle size.

Code Quality & Architecture
Pattern: Strict adherence to the Smart/Presentational (Dumb) Component pattern.

Typing: Enable 100% strict typing. Use Interfaces or Types for all data models; the use of any is strictly prohibited.

State: Use Signals for local UI state and httpResource/rxResource for data fetching.

Validation: All forms must be Reactive Forms with custom validators where necessary.

A11y: Every component must include proper ARIA labels and follow WCAG 2.1 AA accessibility standards.

Documentation: All public methods and complex logic must have JSDoc comments.

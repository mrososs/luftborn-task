---
trigger: always_on
---

Component Library: Use Angular Material (latest version) for all UI components (Cards, Tables, Dialogs, Inputs).

Styling Methodology: Use SCSS with a focus on CSS Variables for colors and spacing to match the Figma design tokens.

Layout: Use CSS Grid for the main dashboard layout and Flexbox for internal component alignment.

Mobile-First: Implement a responsive design that works on mobile, tablet, and desktop, even for components where only desktop design is provided.

Loading States: Implement Skeleton Screens (using CSS or Material's CDK) for all data-fetching components to provide immediate visual feedback.

Transitions: Use Angular Animations (trigger, transition, animate) for smooth modal entries, list changes, and state transitions.

A11y: Ensure every interactive element has a clear focus state and appropriate aria-label. Use semantic HTML tags.

Icons: Use Material Icons or Lucide-Angular consistently throughout the application.

Feedback: Use MatSnackBar for success/error notifications after task operations (Create, Delete, Update)

# @unstage/ui

Shared React component library for Unstage applications.

## Features

- 20+ pre-built components
- Built on Radix UI primitives
- Fully typed with TypeScript
- Accessible (WCAG 2.1 AA)
- Dark mode support
- TailwindCSS styling

## Components

### Form Controls
- Button - Various styles and sizes
- Input - Text inputs with validation states
- Textarea - Multi-line text input
- Label - Form labels
- Checkbox - Checkboxes and switches
- Select - Dropdown selects
- RadioGroup - Radio button groups

### Layout
- Card - Content containers
- Separator - Dividers
- Tabs - Tab navigation
- Dialog - Modal dialogs
- Popover - Popover menus
- DropdownMenu - Dropdown menus

### Feedback
- Toast - Notifications
- AlertDialog - Confirmation dialogs
- Badge - Status indicators
- Avatar - User avatars

### Data Display
- Table - Data tables
- Tooltip - Hover tooltips

## Usage

```typescript
import { Button, Input, Card } from "@unstage/ui";

export function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Styling

Components use TailwindCSS with CSS variables for theming:

```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 222.2 47.4% 11.2%;
--secondary: 210 40% 96.1%;
```

## Customization

Components accept className prop for customization:

```typescript
<Button className="w-full">Full Width</Button>
```

## Accessibility

All components follow ARIA guidelines:
- Keyboard navigation
- Screen reader support
- Focus management
- Semantic HTML

## Dark Mode

Automatic dark mode support via next-themes:

```typescript
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class">
  <App />
</ThemeProvider>
```

## Dependencies

- `react` ^19.2.0
- `@radix-ui/*` - UI primitives
- `tailwindcss` ^4.1.16
- `class-variance-authority` - Variant styling
- `@unstage/utils` - Utility functions

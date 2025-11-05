# @unstage/utils

Shared utilities and helper functions for Unstage.

## Features

- String formatting
- Date utilities
- Validation helpers
- Type guards
- Common utilities

## Utilities

### String Helpers

```typescript
import { cn, formatDate } from "@unstage/utils";

// Combine classNames
const classes = cn("base-class", condition && "conditional-class");

// Format dates
const formatted = formatDate(new Date()); // "Jan 15, 2024"
```

### Validation

```typescript
import { isValidEmail, isValidUrl } from "@unstage/utils";

isValidEmail("user@example.com"); // true
isValidUrl("https://example.com"); // true
```

### Type Guards

```typescript
import { isDefined, isString } from "@unstage/utils";

const value: string | null = getValue();

if (isDefined(value)) {
  // TypeScript knows value is string here
}
```

## API

### `cn(...classes): string`
Combines class names with conditional logic (uses clsx).

### `formatDate(date, format?): string`
Formats dates consistently.

### `isValidEmail(email): boolean`
Validates email format.

### `isValidUrl(url): boolean`
Validates URL format.

### `isDefined<T>(value): value is T`
Type guard for non-null values.

### `sleep(ms): Promise<void>`
Async sleep utility.

## Usage

```typescript
import { cn, formatDate, isValidEmail } from "@unstage/utils";

// Class names
<div className={cn("base", isActive && "active")} />

// Dates
<time>{formatDate(createdAt)}</time>

// Validation
if (isValidEmail(input)) {
  await sendEmail(input);
}
```

## Best Practices

1. Import only what you need
2. Use type guards for type safety
3. Prefer utils over inline logic
4. Keep utilities pure (no side effects)

## Dependencies

- `clsx` - Class name utility
- `date-fns` - Date formatting

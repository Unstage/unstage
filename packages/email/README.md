# @unstage/email

React-based email templates for Unstage using React Email.

## Features

- Type-safe email templates
- React components for emails
- Responsive HTML emails
- Preview server for development

## Templates

- Welcome emails
- Interview invitations
- OTP codes
- Notifications
- Receipts

## Usage

```typescript
import { render } from "@react-email/render";
import { WelcomeEmail } from "@unstage/email/templates/welcome";

const html = render(
  <WelcomeEmail
    name="John Doe"
    otpCode="123456"
  />
);

// Send via Resend
await resend.emails.send({
  from: "noreply@unstage.dev",
  to: "user@example.com",
  subject: "Welcome to Unstage",
  html,
});
```

## Development

```bash
# Preview emails
pnpm email

# Build templates
pnpm build
```

Opens preview server at http://localhost:3002

## Template Structure

```tsx
export function WelcomeEmail({ name, otpCode }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>Welcome {name}!</Text>
          <Text>Your code: {otpCode}</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

## Styling

Uses Tailwind-like inline styles for email compatibility:

```tsx
<Button
  style={{
    backgroundColor: "#000",
    color: "#fff",
    padding: "12px 20px",
  }}
>
  Click Me
</Button>
```

## Testing

Preview all templates in development to ensure cross-client compatibility.

## Dependencies

- `react-email` - Email framework
- `@react-email/components` - Email components
- `@unstage/ui` - Shared styling
- `@unstage/utils` - Utilities

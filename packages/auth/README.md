# @unstage/auth

Authentication utilities using better-auth for the Unstage platform.

## Features

- Email OTP authentication
- Session management
- API key authentication (server-side)
- Client and server utilities
- Type-safe auth hooks

## Tech Stack

- **Framework**: better-auth 1.3.34
- **Database**: Drizzle ORM integration
- **Email**: Email OTP flow
- **Sessions**: Secure cookie-based sessions

## Usage

### Client-Side (React)

```typescript
import { authClient } from "@unstage/auth/client";

// Sign in with email OTP
await authClient.signIn.email({
  email: "user@example.com",
});

// Verify OTP
await authClient.signIn.otp.verify({
  email: "user@example.com",
  code: "123456",
});

// Sign out
await authClient.signOut();

// Get session
const session = await authClient.getSession();
```

### Server-Side

```typescript
import { auth } from "@unstage/auth";

// Get session from request
const session = await auth.api.getSession({
  headers: request.headers,
});

if (!session) {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

// Access user data
console.log(session.user.id);
console.log(session.user.email);
```

## Configuration

Auth is configured with:
- Email OTP provider
- Database adapter (Drizzle)
- Session management
- Security settings

## Environment Variables

- `BETTER_AUTH_SECRET` - Secret key (32+ characters)
- `BETTER_AUTH_URL` - Base URL for callbacks
- `DATABASE_URL` - Database connection

## Session Structure

```typescript
{
  user: {
    id: string;
    email: string;
    full_name: string;
    created_at: Date;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  };
}
```

## Security

- Secure HTTP-only cookies
- CSRF protection
- Rate limiting on OTP requests
- Session expiration
- Secure password hashing (for future use)

## Dependencies

- `@unstage/db` - Database access
- `better-auth` - Auth framework
- `drizzle-orm` - ORM integration

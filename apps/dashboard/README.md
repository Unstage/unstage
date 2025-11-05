# @unstage/dashboard

Recruiter and admin dashboard for managing interviews, teams, and candidates.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TailwindCSS 4, Radix UI
- **Data Fetching**: tRPC 11 with React Query
- **Auth**: better-auth with session management
- **Forms**: React Hook Form + Zod
- **Code Editor**: Monaco Editor
- **Styling**: TailwindCSS 4 + Geist fonts

## Features

- Interview creation and management
- Scenario library and editing
- Team member management
- Candidate tracking and evaluation
- Real-time interview monitoring
- Code scenario editing with Monaco
- Email template management
- Organization settings

## Pages

- `/` - Dashboard home
- `/interviews` - Interview list
- `/interviews/[id]` - Interview details
- `/interviews/[id]/candidates` - Candidate management
- `/scenarios` - Scenario library
- `/team` - Team management
- `/settings` - Organization settings
- `/setup` - Initial setup flow

## Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Runs at http://localhost:3001

## Environment Variables

See `.env.example` for all required variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - API base URL
- `BETTER_AUTH_SECRET` - Auth secret (32+ chars)
- `BETTER_AUTH_URL` - Auth callback URL
- `RESEND_API_KEY` - Email service API key
- `OPENAI_API_KEY` - AI features API key

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── (dashboard)/    # Authenticated dashboard pages
│   ├── (auth)/         # Auth pages (login, signup)
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── forms/          # Form components
│   ├── interview/      # Interview-specific components
│   └── recruiter/      # Recruiter components
├── trpc/               # tRPC client setup
├── lib/                # Utilities
└── env.ts              # Environment validation
```

## Key Features

### Interview Management
- Create interviews with custom scenarios
- Set deadlines and delivery methods
- Track candidate progress
- Review submissions

### Scenario Editor
- Monaco-powered code editor
- Syntax highlighting for multiple languages
- Template library
- AI-powered scenario generation

### Team Collaboration
- Role-based access control
- Team member invitations
- Activity tracking
- Shared interview templates

## Authentication

Uses better-auth with email OTP:
1. User enters email
2. Receives OTP code
3. Verifies and creates session
4. Session persists across requests

Protected routes redirect to `/auth/login` if unauthenticated.

## Components

Built on top of `@unstage/ui` component library:
- Forms with validation
- Data tables
- Modals and dialogs
- Toast notifications
- Loading states

## Deployment

Optimized for Vercel:

```bash
pnpm build
```

Set environment variables in Vercel dashboard.

## Dependencies

- `@unstage/api` - tRPC router types
- `@unstage/auth` - Auth client
- `@unstage/db` - Database access
- `@unstage/email` - Email sending
- `@unstage/location` - Geo utilities
- `@unstage/ui` - Component library

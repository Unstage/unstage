# @unstage/web

Public-facing website and candidate interview experience.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TailwindCSS 4, Radix UI
- **Animations**: Motion (Framer Motion)
- **Payments**: Stripe
- **Styling**: TailwindCSS 4 + Geist fonts
- **Email**: Resend + React Email

## Features

- Marketing landing pages
- Pricing and billing
- Candidate interview taking interface
- Real-time code execution
- Interview submission
- Payment processing

## Pages

- `/` - Homepage
- `/pricing` - Pricing plans
- `/features` - Feature showcase
- `/interview/[id]` - Take interview (candidate view)
- `/about` - About Unstage
- `/contact` - Contact form

## Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Runs at http://localhost:3000

## Environment Variables

See `.env.example`:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - API base URL
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET` - Webhook secret
- `RESEND_API_KEY` - Email API key

## Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── (marketing)/    # Public pages
│   ├── interview/      # Interview pages
│   └── api/            # API routes
├── components/         # React components
│   ├── landing/        # Landing page components
│   ├── interview/      # Interview UI
│   └── pricing/        # Pricing components
├── lib/                # Utilities
└── env.ts              # Environment validation
```

## Key Features

### Interview Experience
- Clean, distraction-free interface
- Code editor with syntax highlighting
- Real-time autosave
- File uploads
- Submission confirmation

### Marketing
- Responsive design
- SEO optimized
- Fast page loads
- Animated interactions

### Payments
- Stripe integration
- Multiple plan tiers
- Subscription management
- Invoice generation

## Styling

Uses TailwindCSS 4 with custom configuration:
- Geist font family
- Dark mode support
- Custom color palette
- Responsive breakpoints

## Deployment

Optimized for Vercel:

```bash
pnpm build
```

Automatic deployments on push to main branch.

## Dependencies

- `@unstage/db` - Database access
- `@unstage/email` - Email templates
- `@unstage/ui` - Component library

# @unstage/location

Geolocation utilities for extracting location data from HTTP requests.

## Features

- Extract location from Vercel headers
- Get country code
- Get timezone
- Get locale/language
- Type-safe API

## Usage

```typescript
import { 
  getCountryCode,
  getTimezone,
  getLocale 
} from "@unstage/location";

// In Next.js server component
import { headers } from "next/headers";

const countryCode = getCountryCode(headers());
// Returns: "US", "GB", "CA", etc.

const timezone = getTimezone(headers());
// Returns: "America/New_York", etc.

const locale = getLocale(headers());
// Returns: "en-US", "fr-FR", etc.
```

## Vercel Headers

Uses Vercel's geolocation headers:
- `x-vercel-ip-country` - Country code
- `x-vercel-ip-timezone` - Timezone
- `x-user-locale` - User locale

## Fallbacks

All functions provide sensible defaults:
- Country: "US"
- Timezone: "America/New_York"
- Locale: "en-US"

## Use Cases

- Localized content
- Timezone-aware scheduling
- Regional compliance
- Analytics
- User personalization

## API

### `getCountryCode(headers): string`
Returns ISO 3166-1 alpha-2 country code.

### `getTimezone(headers): string`
Returns IANA timezone identifier.

### `getLocale(headers): string`
Returns BCP 47 language tag.

## Dependencies

None - uses native Next.js/Vercel headers.

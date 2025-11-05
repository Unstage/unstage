# @unstage/cache

LRU caching utilities for the Unstage API.

## Features

- In-memory LRU cache
- Type-safe cache instances
- Automatic expiration
- Simple API

## Caches

### API Key Cache
Caches API key lookups to reduce database queries:

```typescript
import { apiKeyCache } from "@unstage/cache/api-key-cache";

// Get from cache
const apiKey = apiKeyCache.get(keyHash);

// Set in cache
apiKeyCache.set(keyHash, apiKeyData);

// Clear cache
apiKeyCache.clear();
```

### User Cache
Caches user data:

```typescript
import { userCache } from "@unstage/cache/user-cache";

const user = userCache.get(userId);
userCache.set(userId, userData);
```

## Configuration

Default LRU configuration:
- Max size: 100 items
- TTL: 5 minutes
- Auto-purge on expiration

## Usage Pattern

```typescript
// Try cache first
let data = cache.get(key);

// Fallback to database
if (!data) {
  data = await db.query();
  cache.set(key, data);
}

return data;
```

## Best Practices

1. Cache frequently accessed data
2. Keep cache size reasonable
3. Invalidate on updates
4. Monitor hit rates
5. Use appropriate TTLs

## Dependencies

- `lru-cache` - LRU implementation

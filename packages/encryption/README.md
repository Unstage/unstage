# @unstage/encryption

Encryption utilities using Node.js crypto for secure data handling.

## Features

- AES-256-GCM encryption
- SHA-256 hashing
- Secure random generation
- Type-safe API

## Usage

### Hashing

```typescript
import { hash } from "@unstage/encryption";

const hashed = hash("sensitive-data");
// Returns: SHA-256 hex hash
```

Use for:
- API key storage
- Token verification
- Data fingerprinting

### Encryption

```typescript
import { encrypt, decrypt } from "@unstage/encryption";

// Encrypt
const encrypted = encrypt("secret data", "encryption-key");

// Decrypt
const decrypted = decrypt(encrypted, "encryption-key");
```

Use for:
- PII storage
- Sensitive configuration
- Token encryption

## API

### `hash(data: string): string`
Creates SHA-256 hash of input data.

### `encrypt(data: string, key: string): string`
Encrypts data using AES-256-GCM.

### `decrypt(encrypted: string, key: string): string`
Decrypts AES-256-GCM encrypted data.

### `randomBytes(size: number): Buffer`
Generates cryptographically secure random bytes.

## Security Notes

1. Never commit encryption keys
2. Use environment variables for keys
3. Rotate keys regularly
4. Use unique initialization vectors
5. Validate all inputs

## Best Practices

- Hash for one-way data (passwords, tokens)
- Encrypt for reversible data (PII)
- Use long, random keys (32+ bytes)
- Store keys in secure vaults
- Audit encryption usage

## Dependencies

- `node:crypto` - Node.js crypto module

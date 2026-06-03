
# Security Specification & Test Cases

## Data Invariants
1. A user can only read, create, update, or delete their own user document under `/users/{userId}`.
2. The `uid` property of `/users/{userId}` must strictly match the `{userId}` path identifier and `request.auth.uid`.
3. The `updatedAt` field must be set to `request.time` (the Firestore server timestamp) on any write.
4. The structures `codes`, `progress`, `completedTopics`, and `notes` must be Maps (objects), not primitive types or flat lists.

## The Dirty Dozen Payloads (Security Verification)
The following exploits represent various common vulnerability patterns that will return `PERMISSION_DENIED`.

1. **Identity Hijacking**: Standard authenticated user `alice` attempts to read `/users/bob`.
2. **Path Parameter Exploitation**: Creating `/users/malicious_userId` as `alice` where `userId` doesn't match her actual Auth UID.
3. **Data Identifier Spoofing**: `alice` writes a document where `{userId}` matches `alice`'s UID, but the inner `uid` property is set to `bob`'s UID.
4. **ID Poisoning Attack**: Trying to create a user document with a bloated, corrupt, or excessively long string (e.g. >128 chars) as the `{userId}`.
5. **No-Authentication Creation**: Unauthenticated client trying to write to `/users/any_id`.
6. **PII Exfiltration (Blanket Read)**: Trying to list other users using a blanket collection scan query.
7. **Temporal Deception / Client Timestamps**: Client provides their own hardcoded/arbitrary datetime for `updatedAt` instead of `request.time`.
8. **Malicious Schema Type Injection (Array)**: Client attempts to write `codes` as a Flat Array instead of a Map, trying to bypass deserialization logic on client load.
9. **Malicious Schema Type Injection (String)**: Client tries to write `progress` as a giant string instead of a Map to lock or corrupt the schema layout.
10. **State Poisoning**: Client attempts to write shadow/unsupported fields to the document.
11. **Impersonation through Missing Identity Verification**: Write operation that omit the `uid` check or uses a null auth token context, expecting standard permissions.
12. **Tampering / Attempted Deletion**: Standard user `bob` attempting to purge/delete `/users/alice`'s dataset.

## Rule Enforcement Summary
Every single write begins with the `isValidUserProgress` rule validation checks, and all queries require `isOwner(userId)`, ensuring complete protection.

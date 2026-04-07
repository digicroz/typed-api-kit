# @digicroz/onesignal

[![npm version](https://img.shields.io/npm/v/@digicroz/onesignal.svg)](https://www.npmjs.com/package/@digicroz/onesignal)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Type-safe OneSignal push notification client for Node.js and TypeScript.

## Installation

```bash
npm install @digicroz/onesignal
```

## Quick Start

```typescript
import { createOneSignalClient } from "@digicroz/onesignal";

const onesignal = createOneSignalClient({
  appId: "YOUR_ONESIGNAL_APP_ID",
  apiKey: "YOUR_ONESIGNAL_REST_API_KEY",
});

// Send to all users
const result = await onesignal.pushNotificationToAllUsers({
  message: "Hello everyone!",
  heading: "Announcement",
});

if (result.status === "success") {
  console.log("Notification ID:", result.data.id);
}

// Send to specific users
const targeted = await onesignal.pushNotificationToSpecificUsers({
  message: "Hello!",
  heading: "Personal Update",
  externalUserIds: ["user_123", "user_456"],
});

if (targeted.status === "success") {
  console.log("Notification ID:", targeted.data.id);
  console.log("Invalid user IDs:", targeted.data.invalidExternalUserIds);
}
```

## API Reference

### `createOneSignalClient(config)`

Creates a OneSignal client instance.

| Parameter | Type     | Required | Description                 |
| --------- | -------- | -------- | --------------------------- |
| `appId`   | `string` | ✅       | Your OneSignal App ID       |
| `apiKey`  | `string` | ✅       | Your OneSignal REST API Key |

**Returns** an object with the methods below.

---

### `pushNotificationToAllUsers(options)`

Sends a push notification to **all subscribed users**.

| Parameter      | Type     | Required | Description                              |
| -------------- | -------- | -------- | ---------------------------------------- |
| `message`      | `string` | ✅       | Notification body text                   |
| `heading`      | `string` | ❌       | Notification title                       |
| `onClickLink`  | `string` | ❌       | URL to open when notification is clicked |
| `thumbnailUrl` | `string` | ❌       | Big picture / thumbnail image URL        |

**Returns** `StdResponse<{ id: string }>`

---

### `pushNotificationToSpecificUsers(options)`

Sends a push notification to **specific users** by their external user IDs.

| Parameter         | Type       | Required | Description                              |
| ----------------- | ---------- | -------- | ---------------------------------------- |
| `message`         | `string`   | ✅       | Notification body text                   |
| `heading`         | `string`   | ❌       | Notification title                       |
| `onClickLink`     | `string`   | ❌       | URL to open when notification is clicked |
| `thumbnailUrl`    | `string`   | ❌       | Big picture / thumbnail image URL        |
| `externalUserIds` | `string[]` | ✅       | Array of external user IDs to target     |

**Returns** `StdResponse<{ id: string; invalidExternalUserIds: string[] }>`

## Error Codes

All methods return a `StdResponse` from `@digicroz/js-kit`. On failure the `error` field will be one of:

| Error Code                                | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `all_included_players_are_not_subscribed` | None of the targeted users have active subscriptions |
| `onesignal_app_id_is_invalid`             | The provided App ID is malformed or invalid          |
| `onesignal_api_key_is_invalid`            | The provided REST API Key is invalid                 |
| `onesignal_message_content_is_invalid`    | Message body is missing or invalid                   |
| `onesignal_message_recipients_is_invalid` | Recipients list is missing or invalid                |
| `onesignal_unknown_response`              | Unexpected successful response from OneSignal        |
| `onesignal_unknown_error`                 | Unexpected error response from OneSignal             |

## Dependencies

- [`@digicroz/js-kit`](https://www.npmjs.com/package/@digicroz/js-kit) — `stdResponse` utilities
- [`axios`](https://www.npmjs.com/package/axios) — HTTP client
- [`zod`](https://www.npmjs.com/package/zod) — Runtime type validation

## License

[MIT](LICENSE) © [Adarsh Hatkar](https://github.com/AdarshHatkar)

# ConvertKit - BusinessQL App

## Deno

```typescript
import { ConvertKit } from 'https://storage.nubo.codes/@businessql/convertkit/0.0.1/mod.ts';

await ConvertKit.subscribe({
  groupId: '1234567',
  email: 'john@test.com',
  name: 'John Johnson',
});

await ConvertKit.getSubscriber({
  id: '0123456789',
});

await ConvertKit.updateSubscriber({
  id: '0123456789',
  email: 'joh@test.com',
  name: 'John J. Johnson',
});

await ConvertKit.unsubscribe({
  email: 'john@test.com',
});
```

---
layout: default
monacoTypesAdditionalPackages:
  - "@apollo/client"
---

## At its core, Apollo Client is a state management library

<div 
  v-click
  v-motion
  :initial="{ opacity: 0, x: 100 }"
  :enter="{ opacity: 1, x: 0, transition: { duration: 500, type: 'spring', stiffness: 150 } }"
  class="border border-gray-400 p-2 my-2 rounded-lg"
>

> Apollo Client enables you to manage local state alongside remotely fetched state, meaning you can interact with all of your application's state with a single API.

> <small>— Apollo Client Documentation</small>

</div>

<div  class="grid grid-cols-2 gap-4">
  <div
    v-click
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
    class="border border-blue-400 p-4 rounded-lg"
  >
    <h3 class="text-xl font-bold mb-2">Local-only Fields</h3>
    <ul class="text-sm">
      <li>Extend server data with client-side fields</li>
      <li>Use @client directive in queries</li>
      <li>Defined in type policies</li>
    </ul>

<div>
```graphql
query ProductDetails($sku: String!) {
  product(sku: $sku) {
    name
    price
    isInCart @client # This is a local-only field
  }
}
```
</div>

  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
    class="border border-green-400 p-4 rounded-lg"
  >
    <h3 class="text-xl font-bold mb-2">Reactive Variables</h3>
    <ul class="text-sm">
      <li>Standalone reactive state containers</li>
      <li>Not tied to the cache</li>
      <li>Can trigger query re-execution</li>
    </ul>

<div>

```ts
import { makeVar, useReactiveVar } from "@apollo/client";
export const cartItemsVar = makeVar([]);

export function Cart() {
  const cartItems = useReactiveVar(cartItemsVar);
  // ...
}
```

</div>
  </div>
</div>
